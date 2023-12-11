//To avoid send multiple connections to the server

const { Pool } = require('pg');
const { config } = require('../config/config');

//Encode uri is to protect our keys
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//In the URI we paste the url of connection from AWS or Heroku || https://node-postgres.com/features/connecting
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({
  connectionString: URI,
});

module.exports = pool;
