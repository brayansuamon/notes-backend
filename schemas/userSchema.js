const Joi = require('joi');

const userId = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const createdAt = Joi.string().isoDate();
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  userId,
  email: email.required(),
  password: password.required(),
  createdAt,
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email,
  password,
  createdAt,
  role,
});

const getUserSchema = Joi.object({
  userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
