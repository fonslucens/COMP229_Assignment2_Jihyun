import mongoose from 'mongoose';
import User from '../models/user.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import pickFields from '../helpers/requestData.js';

const create = async (req, res) => {
  try {
    const user = new User(pickFields(req.body, ['name', 'email', 'password']));
    await user.save();
    return res.status(201).json({ message: 'Successfully signed up!', user });
  } catch (err) {
    return res.status(err.code === 11000 ? 409 : 400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated');
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const userByID = async (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ error: 'Invalid user ID' });
  try {
    const user = await User.findById(id).select('+hashed_password +salt');
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.profile);

const update = async (req, res) => {
  const data = pickFields(req.body, ['name', 'email', 'password']);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide name, email or password to update' });
  try {
    const user = req.profile;
    for (const field in data) user[field] = data[field];
    user.updated = new Date();
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(err.code === 11000 ? 409 : 400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.profile.deleteOne();
    return res.json({ message: 'User deleted', _id: req.profile._id });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    return res.json({ message: 'All users deleted', deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, userByID, read, update, remove, removeAll };
