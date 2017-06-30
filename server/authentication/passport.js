const passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var Models = require('../models');

passport.serializeUser(function(user, done) {
  // console.log("running serializeUser:", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Models.users.findById(id)
  .then((result)=>{
    // console.log("deserializeing the user", result);
    done(err, result);
  })
  .catch((err)=>{
    done(err, user);
  });
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.HOST_URL}/auth/github/callback`
},
  function(accessToken, refreshToken, profile, cb) {
    // console.log("The profile is:", profile);
    //id, user_email
    Models.users.findOrCreate(profile.username)
    .then((result)=>{
      // console.log("running cb with", result[0]);
      cb(null, result[0]);
    })
    .catch((err)=>{
      cb(err, null);
    });
  }
));

module.exports = passport;