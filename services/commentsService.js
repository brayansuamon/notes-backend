const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class commentsService {
  constructor() {}

  async create(data) {
    const newComment = await models.Comment.create(data);
    return newComment;
  }

  async addItem(data) {
    const newItem = await models.CommentNote.create(data);
    return newItem;
  }

  async find() {
    const rta = await models.Comment.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findOne(id) {
    const comment = await models.Comment.findByPk(id, {
      include: [
        {
          association: 'customer',
          //Bring the user from the customer
          include: ['user'],
        },
        'items',
      ],
    });
    if (!comment) {
      throw boom.notFound('Comment not found');
    }
    return comment;
  }

  async update(id, changes) {
    // const user = await models.User.findByPk(id);
    // To reuse code this.findOne(id)
    const comment = await this.findOne(id);
    const rta = await comment.update(changes);
    return rta;
  }

  async delete(id) {
    const comment = await this.findOne(id);
    await comment.destroy();
    return { id };
  }
}

module.exports = commentsService;
