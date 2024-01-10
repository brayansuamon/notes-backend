'use strict';

//Here we can import the models we wanted to createn the same order, later  of await
const {
  CommentNoteSchema,
  COMMENT_NOTE_TABLE,
} = require('./../models/comment-note.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(COMMENT_NOTE_TABLE, CommentNoteSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(COMMENT_NOTE_TABLE);
  },
};
