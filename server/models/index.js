var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  users: {
    findOrCreate: function (profile) {
      // return db.query(
      //   `INSERT INTO mad_map_users
      //       (user_name)
      //   SELECT '${githubId}'
      //   WHERE
      //       NOT EXISTS (
      //           SELECT user_name FROM mad_map_users WHERE user_name = '${githubId}'
      //       );
      //     SELECT *
      //     FROM mad_map_users
      //     WHERE user_name='${githubId}'`);
    },
    get: function () {
      return db.query('select * from mad_map_users');
    },
    saveUser: function(username, password, salt) {
      return db.query(`insert into mad_map_users (user_name, password, salt)
      values ('${username}', '${password}', '${salt}');`);
    },
    findByEmail: function(email) {
      return db.any(`select * from mad_map_users where email='${email}';`);
    },
    addUserWithGoogle: function(profile) {
      console.log('addUserWithGoogle: ', `${profile.emails[0].value}`);
      return db.query(`
        INSERT INTO mad_map_users
        (email, firstName, lastName, avatar)
        VALUES ('${profile.emails[0].value}', '${profile.name.givenName}', '${profile.name.familyName}', '${profile.photos[0].value}')
        RETURNING *;
      `);
    },
    findById: function (id) {
      return db.query(`select * from mad_map_users where id='${id}';`);
    }
  },
  maps: {
    create: function ({title, zoom, currentCenter, currentUser}) {
      console.log('currentUser.id ', currentUser.id);
      if (!currentUser.id) {
        currentUser.id = null;
      }
      return db.query (
        `INSERT INTO mad_map_maps
            (name, zoom, current_center, user_id)
         VALUES ('${title}', ${zoom}, '${currentCenter}', ${currentUser.id});
         SELECT currval('mad_map_maps_id_seq');`);
    },
    get: function (mapId) {
      var state = {};
      return db.query(`select * from mad_map_maps where id=${mapId}`)
        .then((result)=>{
          var latLng = result[0]['current_center'].split('/');
          state['currentCenter'] = {
            'lat': Number(latLng[0]),
            'lng': Number(latLng[1])
          };
          state['zoom'] = result[0]['zoom'];
          state['markers'] = [];
          state['mapId'] = mapId;
          return module.exports.markers.getbyMapId(mapId);
        })
        .then((results)=>{
          return Promise.map(results, result => {
            var marker = {
              'position': {'lat': result['lat'], 'lng': result['lng']},
              'icon': {
                'path': result['icon_path'],
                'fillOpacity': 1.0,
                'fillColor': result['fill_color'],
                'strokeColor': result['stroke_color'],
                'strokeOpacity': 0.0,
                'anchor': {
                  x: 10,
                  y: 10
                }
              },
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
    create: function ({lat, lng, iconPath, fillColor, strokeColor, info, mapId}) {
      return db.query(
        `INSERT INTO mad_map_markers
            (lat, lng, icon_path, info, fill_color, stroke_color, map_id)
         VALUES (${lat}, ${lng}, '${iconPath}', '${info}', '${fillColor}', '${strokeColor}', ${mapId});`);
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
  },
  friends: {
    get: function(userId) {
      return db.query(`
        select mad_map_users.id, mad_map_users.email, mad_map_users.firstName, mad_map_users.lastName
        from mad_map_users inner join
        (select * from mad_map_friends where mad_map_friends.user_id = ${userId}) as friends
        on mad_map_users.id = friends.friends_id;
      `);
    },
    addFriend: function(userId, friendId) {
      return db.query(`
        insert into mad_map_friends
        (user_id, friends_id)
        VALUES (${userId}, ${friendId});
      `);
    }
  }
};