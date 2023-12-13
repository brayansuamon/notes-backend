const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class usersService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(userId) {
    const user = await models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(userId, changes) {
    // const user = await models.User.findByPk(userId);
    // To reuse code this.findOne(userId)
    const user = await this.findOne(userId);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(userId) {
    const user = await this.findOne(userId);
    await user.destroy();
    return { userId };
  }
}

module.exports = usersService;
