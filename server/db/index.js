// const Sequelize = require('sequelize');
//
// let db;
//
// if (process.env.DATABASE_URL) {
//   db = new Sequelize(process.env.DATABASE_URL);
// } else {
//   db = new Sequelize('mad_map_db', '', '', { host: 'localhost', dialect: 'postgres' });
// }
//
// const User = db.define({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   email: { type: Sequelize.STRING, unique: true },
//   firstName: Sequelize.STRING,
//   lastName: Sequelize.STRING
// });
//
// const Map = db.define({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true
//   },
//   name: Sequelize.STRING,
//   zoom: Sequelize.INTEGER,
//   'current_center': Sequelize.TEXT
// });
//
// const Marker = db.define({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true
//   },
//   lat: Sequelize.FLOAT,
//   lng: Sequelize.FLOAT,
//   'icon_path': Sequelize.TEXT,
//   info: Sequelize.TEXT,
//   'fill_color': Sequelize.TEXT,
//   'stroke_color': Sequelize.TEXT,
// });
//
// const Friend = db.define({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true
//   }
// });
//
// Usre.hasMany(Map);
//
// Map.belongsTo(User);
//
// Map.hasMany(Marker);
//
// Marker.belongsTo(Map);



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
