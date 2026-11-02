import mongoose from 'mongoose';
import crypto from 'node:crypto';

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: 'Name is required' },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  hashed_password: { type: String, required: 'Password is required', select: false },
  salt: { type: String, select: false }
});

// Week 4/6 pattern: accept password virtually, persist only hash and salt.
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    if (typeof password !== 'string') {
      this.invalidate('password', 'Password must be a string');
      return;
    }
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password; });

UserSchema.path('hashed_password').validate(function() {
  if (typeof this._password === 'string' && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) this.invalidate('password', 'Password is required');
  return true;
}, 'Invalid password');

UserSchema.methods = {
  authenticate: function(plainText) {
    if (typeof plainText !== 'string' || !this.hashed_password || !this.salt) return false;
    const candidate = Buffer.from(this.encryptPassword(plainText), 'hex');
    const stored = Buffer.from(this.hashed_password, 'hex');
    return candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
  },
  encryptPassword: function(password) {
    // Explicit security adaptation: scrypt replaces the slide's fast SHA-1 HMAC.
    // Synchronous form preserves the course's virtual-setter flow for this LOCAL lab.
    return crypto.scryptSync(password, this.salt, 64).toString('hex');
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString('hex');
  }
};

// Never return password material through a JSON API response.
UserSchema.set('toJSON', {
  virtuals: false,
  transform: function(doc, ret) {
    delete ret.hashed_password;
    delete ret.salt;
    delete ret.password;
    delete ret._password;
    return ret;
  }
});

export default mongoose.model('User', UserSchema, 'users');
