'use strict';

const { DataTypes } = require('sequelize');
//Here we can import the models we wanted to createn the same order, later  of await
const { CUSTOMER_TABLE } = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    //We paste data in this way from customer model to avoid errors for fields created before (exp --> reference)
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface) {
    //Fields
  },
};
