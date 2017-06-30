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
    }
  },
  maps: {
    create: function ({userId, zoom, currentCenter}) {
      return db.query(
        `INSERT INTO mad_map_maps
            (user_id, zoom, current_center)
         VALUES (${userId}, ${zoom}, ${currentCenter})'`);
    },
    get: function (mapId) {
      return db.query('select * from mad_map_maps where id=${mapId}');   
    },
    update: function ({mapId, userId, zoom, currentCenter}) {
      return db.query(
        `UPDATE mad_map_apps
        SET user_id = ${userId},
         zoom = ${zoom},
         current_center = ${currentCenter}
        WHERE
         id = ${mapId};`);   
    }
  },
  markers: {
    create: function ({markerId, lat, lng, icon}) {
      return db.query(
        `INSERT INTO mad_map_maps
            (map_id, lat, lng, icon)
         VALUES (${markerId}, ${lat}, ${lng}, ${icon})'`);
    },
    get: function (markerId) {
      return db.query('select * from mad_map_maps where id=${markerId}');   
    },
    update: function ({markerId, lat, lng, icon}) {
      return db.query(
        `UPDATE mad_map_apps
        SET lat = ${lat},
         lng = ${lng},
         icon = ${icon}
        WHERE
         id = ${markerId};`);   
    }
  }
};












