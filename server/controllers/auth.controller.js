import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import User from '../models/user.model.js';
import config from '../../config/config.js';

const cookieOptions = { httpOnly: true, sameSite: 'lax', secure: config.env === 'production', path: '/' };

const signin = async (req, res) => {
  if (!req.body || typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    return res.status(400).json({ error: 'Provide email and password in the JSON body' });
  }
  try {
    const user = await User.findOne({ email: req.body.email.trim() }).select('+hashed_password +salt');
    if (!user || !user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret, { algorithm: 'HS256', expiresIn: '1h' });
    res.cookie('t', token, { ...cookieOptions, maxAge: 60 * 60 * 1000 });
    return res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: 'Could not sign in' });
  }
};

const signout = (req, res) => {
  // Course semantics: clear cookie. The client must also discard its Bearer token.
  // This does NOT revoke an already issued JWT on the server.
  res.clearCookie('t', cookieOptions);
  return res.json({ message: 'signed out' });
};

// express-jwt v8 uses requestProperty, not the old userProperty setting.
const requireSignin = [
  expressjwt({ secret: config.jwtSecret, algorithms: ['HS256'], requestProperty: 'auth' }),
  async (req, res, next) => {
    // Safety addition: a JWT for a deleted account is no longer usable.
    try {
      if (!req.auth || typeof req.auth._id !== 'string' || !await User.exists({ _id: req.auth._id })) {
        return res.status(401).json({ error: 'User no longer exists. Sign in again.' });
      }
      next();
    } catch (err) { next(err); }
  }
];

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) return res.status(403).json({ error: 'User is not authorized' });
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
