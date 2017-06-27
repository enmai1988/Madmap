const pgp = require('pg-promise')();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'mad_map_db',
  user: 'mad_map_db',
};

const db = pgp(connection);


module.exports = db;