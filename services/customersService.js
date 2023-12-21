const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class customersService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll();
    return rta;
  }

  async findOne(userId) {
    const user = await models.Customer.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(userId, changes) {
    // const user = await models.User.findByPk(userId);
    // To reuse code this.findOne(userId)
    const customer = await this.findOne(userId);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(userId) {
    const customer = await this.findOne(userId);
    await customer.destroy();
    return { userId };
  }
}

module.exports = customersService;
