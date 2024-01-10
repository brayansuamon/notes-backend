'use strict';

//Here we can import the models we wanted to createn the same order, later  of await
const { CommentSchema, COMMENT_TABLE } = require('./../models/comment.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(COMMENT_TABLE);
  },
};
