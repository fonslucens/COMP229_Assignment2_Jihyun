import mongoose from 'mongoose';

// Field names/types follow Assignment 2. Additional required rules are not imposed.
const ProjectSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String
});

export default mongoose.model('Project', ProjectSchema, 'projects');
