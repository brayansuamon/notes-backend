const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getCommentSchema = Joi.object({
  id: id.required(),
});

const createCommentSchema = Joi.object({
  customerId: customerId.required(),
});

module.exports = { getCommentSchema, createCommentSchema };
