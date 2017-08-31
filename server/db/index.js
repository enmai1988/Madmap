const pgp = require('pg-promise')({ promiseLib: require('bluebird') });
const config = require('config')['pg'];

module.exports = pgp(process.env.DATABASE_URL = {
  host: config.connection.host,
  database: config.connection.database,
  user: config.connection.user,
  password: config.connection.password
});