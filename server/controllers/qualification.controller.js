import mongoose from 'mongoose';
import Qualification from '../models/qualification.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import pickFields from '../helpers/requestData.js';

const fields = ["title", "firstname", "lastname", "email", "completion", "description"];

const create = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide at least one qualification field in the JSON body' });
  try {
    const item = new Qualification(data);
    await item.save();
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const items = await Qualification.find();
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const qualificationByID = async (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ error: 'Invalid qualification ID' });
  try {
    const item = await Qualification.findById(id);
    if (!item) return res.status(404).json({ error: 'Qualification not found' });
    req.qualification = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.qualification);

const update = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide a qualification field to update' });
  try {
    for (const field in data) req.qualification[field] = data[field];
    await req.qualification.save();
    return res.json(req.qualification);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne();
    return res.json({ message: 'Qualification deleted', _id: req.qualification._id });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    return res.json({ message: 'All qualifications deleted', deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, qualificationByID, read, update, remove, removeAll };
