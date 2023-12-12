const { faker } = require('@faker-js/faker');
const { models } = require('../libs/sequelize');

class usersService {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const newUser = {
      ...data,
      userId: faker.string.uuid(),
      isBlock: faker.datatype.boolean(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const rta = await models.User.findOne({ id });
    return rta;
  }

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = usersService;
