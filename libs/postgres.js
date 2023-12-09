const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'brayansuamon',
    password: 'admin123',
    database: 'my_store',
  });
  await client.connect();
  //We need to return to offer the posiblity to execute queries
  return client;
}

module.exports = getConnection;
