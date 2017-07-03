const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var Models = require('../models');

passport.serializeUser((user, done) => {
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