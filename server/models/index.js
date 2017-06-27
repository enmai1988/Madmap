var db = require('../db');

module.exports.users = () => {
  console.log("running query method");
  return db.query('select * from mad_map_users');
};
