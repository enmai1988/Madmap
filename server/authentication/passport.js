const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const Models = require('../models');
const config = require('config')['passport'];

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Models.users.findById(id)
    .then(result => {
      done(null, result[0]);
    })
    .catch((err)=>{
      done(err, null);
    });
});

passport.use(new Strategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'emails', 'name', 'picture']  
},
function(accessToken, refreshToken, profile, cb) {
  Models.users.findByEmail(profile.emails[0].value)
    .then(result => {
      if (!result) { throw result; }
      if (!result.length) {
        return Promise.resolve(Models.users.addUser(profile));
      }
      return result;
    }).then(user => {
      if (!user) { throw user; }
      cb(null, user[0]);
    }).catch(() => {
      cb(null, false);
    });
}
));

module.exports = passport;
