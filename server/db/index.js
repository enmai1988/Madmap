const pgp = require('pg-promise')();

//For heroku deployment
let db;
if (process.env.DATABASE_URL === 'localhost') {
  const connection = {
    host: process.env.DATABASE_URL,
    database: 'mad_map_db',
    user: 'mad_map_db',
  };
  db = pgp(connection);
} else {
  db = pgp(process.env.DATABASE_URL);
}
module.exports = db;