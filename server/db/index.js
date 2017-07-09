const pgp = require('pg-promise')({ promiseLib: require('bluebird') });


if (process.env.DATABASE_URL === 'localhost') {
  const connection = {
    host: 'localhost',
    database: 'mad_map_db',
    user: '',
  };
  db = pgp(connection);
} else {
  db = pgp(process.env.DATABASE_URL);
}
module.exports = db;
