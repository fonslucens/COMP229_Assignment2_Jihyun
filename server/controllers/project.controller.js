import mongoose from 'mongoose';
import Project from '../models/project.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import pickFields from '../helpers/requestData.js';

const fields = ["title", "firstname", "lastname", "email", "completion", "description"];

const create = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide at least one project field in the JSON body' });
  try {
    const item = new Project(data);
    await item.save();
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const items = await Project.find();
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const projectByID = async (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ error: 'Invalid project ID' });
  try {
    const item = await Project.findById(id);
    if (!item) return res.status(404).json({ error: 'Project not found' });
    req.project = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.project);

const update = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide a project field to update' });
  try {
    for (const field in data) req.project[field] = data[field];
    await req.project.save();
    return res.json(req.project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.project.deleteOne();
    return res.json({ message: 'Project deleted', _id: req.project._id });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    return res.json({ message: 'All projects deleted', deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, projectByID, read, update, remove, removeAll };
