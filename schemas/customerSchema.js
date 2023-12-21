const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10);
const createdAt = Joi.string().isoDate();

const createCustomerSchema = Joi.object({
  id,
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  createdAt,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  createdAt,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
