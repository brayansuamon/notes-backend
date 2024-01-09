const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10);
const createdAt = Joi.string().isoDate();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createCustomerSchema = Joi.object({
  id,
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  createdAt,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  createdAt,
  id,
  userId,
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
