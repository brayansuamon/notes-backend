const { config } = require('../config/config');

//Encode uri is to protect our keys
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//In the URI we paste the url of connection from AWS or Heroku || https://node-postgres.com/features/connecting
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
