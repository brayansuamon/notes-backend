//Schema are for validate data that comes from the frontend
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(3).max(20);
const description = Joi.string().alphanum().min(3).max(100);
const date = Joi.string();
const state = Joi.string();
const isBlock = Joi.boolean();

const id_min = Joi.number().integer();
const id_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

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

const queryNotesSchema = Joi.object({
  limit: limit,
  offset,
  state,
  id_min,
  //Validation if we have min value the max is required
  id_max: id_max.when('id_min', {
    is: Joi.number().integer(), //I can add a value fixed like 5
    then: Joi.required(),
  }),
});

module.exports = {
  createNotesSchema,
  updateNotesSchema,
  getNotesSchema,
  queryNotesSchema,
};
