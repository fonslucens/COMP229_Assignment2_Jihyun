import mongoose from 'mongoose';

// Field names/types follow Assignment 2. Additional required rules are not imposed.
const ContactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});

export default mongoose.model('Contact', ContactSchema, 'contacts');
