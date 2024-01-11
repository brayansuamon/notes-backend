'use strict';

const { DataTypes } = require('sequelize');
//Here we can import the models we wanted to createn the same order, later  of await
const { COMMENT_NOTE_TABLE } = require('./../models/comment-note.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(COMMENT_NOTE_TABLE, 'amount', {
      field: 'amount',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(COMMENT_NOTE_TABLE, 'amount');
  },
};
