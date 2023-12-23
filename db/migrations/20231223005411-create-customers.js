'use strict';

//Here we can import the models we wanted to createn the same order, later  of await
const {
  CustomerSchema,
  CUSTOMER_TABLE,
} = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
