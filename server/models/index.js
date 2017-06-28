var db = require('../db');

module.exports = {
  users: {  
    findOrCreate: function (githubId) {
      return db.query(
        `INSERT INTO mad_map_users
            (user_name)
        SELECT '${githubId}'
        WHERE
            NOT EXISTS (
                SELECT user_name FROM mad_map_users WHERE user_name = '${githubId}'
            );
          SELECT * 
          FROM mad_map_users 
          WHERE user_name='${githubId}'`);
    },
    get: function () {
      return db.query('select * from mad_map_users');   
    },
    findById: function (id) {
      return db.query(`select * from mad_map_users where id='${id}'`);   
    },
    
  }
};












