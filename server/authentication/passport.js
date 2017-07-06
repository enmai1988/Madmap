const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// var GitHubStrategy = require('passport-github').Strategy;
const Strategy = require('passport-google-oauth').OAuth2Strategy;
var Models = require('../models');
const createHash = require('crypto').createHash;


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

// passport.use(new LocalStrategy((email, password, done) => {
//   let salt;
//   let passwordAttempt;
//   let user;
//   Models.users.findByEmail(email)
//     .then(result => {
//       console.log('USER:', result[0]);
//       salt = result[0].salt;
//       passHash = result[0].password;
//       user = result;
//       return Promise.resolve(createHash('sha256').update(password + salt));
//     })
//     .then(hashObj => {
//       passwordAttempt = hashObj.digest('hex');
//       if (passHash === passwordAttempt) {
//         return done(null, user[0]);
//       } else {
//         throw 'wrong';
//       }
//     })
//     .catch(err => done(err, null));
// }));

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: `${process.env.HOST_URL}/auth/google/callback`
},
function(accessToken, refreshToken, profile, cb) {
  Models.users.findByEmail(profile.emails[0].value)
    .then(result => {
      if (!result) { throw result; }
      if (!result.length) {
        return Promise.resolve(Models.users.addUserWithGoogle(profile));
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
