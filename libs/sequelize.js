const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

//Encode uri is to protect our keys
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//In the URI we paste the url of connection from AWS or Heroku || https://node-postgres.com/features/connecting
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//Sequelize has incorporated pool function
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize); //He understand the model

sequelize.sync(); // Sync the information and create the table || NOT in PROD

module.exports = sequelize;
