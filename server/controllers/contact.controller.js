import mongoose from 'mongoose';
import Contact from '../models/contact.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import pickFields from '../helpers/requestData.js';

const fields = ["firstname", "lastname", "email"];

const create = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide at least one contact field in the JSON body' });
  try {
    const item = new Contact(data);
    await item.save();
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const items = await Contact.find();
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const contactByID = async (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ error: 'Invalid contact ID' });
  try {
    const item = await Contact.findById(id);
    if (!item) return res.status(404).json({ error: 'Contact not found' });
    req.contact = item;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.contact);

const update = async (req, res) => {
  const data = pickFields(req.body, fields);
  if (Object.keys(data).length === 0) return res.status(400).json({ error: 'Provide a contact field to update' });
  try {
    for (const field in data) req.contact[field] = data[field];
    await req.contact.save();
    return res.json(req.contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    return res.json({ message: 'Contact deleted', _id: req.contact._id });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    return res.json({ message: 'All contacts deleted', deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, contactByID, read, update, remove, removeAll };
