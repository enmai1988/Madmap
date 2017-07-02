var db = require('../db');
var Promise = require('bluebird');

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
      if(!userId) {
        userId = null;
      }
      return db.query(
        `INSERT INTO mad_map_maps
            (zoom, current_center, user_id)
         VALUES (${zoom}, '${currentCenter}', ${userId});
         SELECT currval('mad_map_maps_id_seq');`);
    },
    get: function (mapId) {
      var state = {};
      return db.query(`select * from mad_map_maps where id=${mapId}`)
      .then((result)=>{
        console.log("Result from grabbing a map", result);
        var latLng = result[0]['current_center'].split('/');
        state['currentCenter']= {
          'lat': latLng[0],
          'lng': latLng[1]
        };
        state['zoom'] = result[0]['zoom'];
        state['markers'] = [];
        state['mapId'] = mapId;
        return module.exports.markers.getbyMapId(mapId);
      })
      .then((results)=>{
        console.log("The results from markers.get", results);
        return Promise.map(results, result => {
          var marker = {
            'position': {'lat': result['lat'], 'lng': result['lng']},
            'icon': result['icon'],
            'info': result['info']
          };
          state.markers.push(marker);
        })
        .then((result)=>{
          return Promise.resolve(state);
        });
        
      });
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
    create: function ({lat, lng, icon, info, mapId}) {
      return db.query(
        `INSERT INTO mad_map_markers
            (lat, lng, icon, map_id)
         VALUES (${lat}, ${lng}, ${icon}, ${mapId});`);
    },
    //INSERT INTO mad_map_markers (lat, lng, icon, info, map_id) VALUES (50, -129, 3,'some info about our pin', 1);
    getbyMapId: function(mapId) {
      return db.query(`select * from mad_map_markers where map_id=${mapId};`);   
    },
    get: function (markerId) {
      return db.query(`select * from mad_map_markers where id=${markerId};`);   
    },
    update: function ({markerId, lat, lng, icon}) {
      return db.query(
        `UPDATE mad_map_markers
        SET lat = ${lat},
         lng = ${lng},
         icon = ${icon}
        WHERE
         id = ${markerId};`);   
    }
  }
};












