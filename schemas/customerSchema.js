const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10);
const createdAt = Joi.string().isoDate();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  id,
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  createdAt,
  userId: userId.required(),
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
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
