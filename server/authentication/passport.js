const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var Models = require('../models');
const createHash = require('crypto').createHash;


passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Models.users.findById(id)
    .then((result)=>{
      done(null, result);
    })
    .catch((err)=>{
      done(err, null);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  let salt;
  let passwordAttempt;
  let user;
  Models.users.findByUserName(username)
    .then(result => {
      console.log('USER:', result[0]);
      salt = result[0].salt;
      passHash = result[0].password;
      user = result;
      return Promise.resolve(createHash('sha256').update(password + salt));
    })
    .then(hashObj => {
      passwordAttempt = hashObj.digest('hex');
      if (passHash === passwordAttempt) {
        return done(null, user[0]);
      } else {
        throw 'wrong';
      }
    })
    .catch(err => done(err, null));
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.HOST_URL}/auth/github/callback`
},
function(accessToken, refreshToken, profile, cb) {
  Models.users.findOrCreate(profile.username)
    .then((result)=>{
      cb(null, result[0]);
    })
    .catch((err)=>{
      cb(err, null);
    });
}
));

module.exports = passport;