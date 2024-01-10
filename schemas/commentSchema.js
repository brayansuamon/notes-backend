const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const description = Joi.string();

const getCommentSchema = Joi.object({
  id: id.required(),
});

const createCommentSchema = Joi.object({
  customerId: customerId.required(),
  description: description.required(),
});

module.exports = { getCommentSchema, createCommentSchema };
