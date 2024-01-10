//Schema are for validate data that comes from the frontend
const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().alphanum().min(3).max(20);
const description = Joi.string().alphanum().min(3).max(100);
const date = Joi.string();
const state = Joi.string();
const isBlock = Joi.boolean();

const createNotesSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  date: date.required(),
  state: state.required(),
  isBlock: isBlock,
});

const updateNotesSchema = Joi.object({
  //For Id validations we use getNotesSchema
  name: name,
  description: description,
});

const getNotesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createNotesSchema, updateNotesSchema, getNotesSchema };
