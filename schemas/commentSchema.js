const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const description = Joi.string();
const commentId = Joi.number().integer();
const noteId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getCommentSchema = Joi.object({
  id: id.required(),
});

const createCommentSchema = Joi.object({
  customerId: customerId.required(),
  description: description.required(),
});

const addItemSchema = Joi.object({
  commentId: commentId.required(),
  noteId: noteId.required(),
  amount: amount.required(),
});

module.exports = { getCommentSchema, createCommentSchema, addItemSchema };
