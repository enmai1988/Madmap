require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var Models = require('./models');
var passport = require('./authentication/passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/dist'));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cookieParser());

app.get('/users', function(req, res) {
  Models.users.get()
  .then((result)=>{
    res.end(JSON.stringify(result));
  })
  .catch((err)=>{
    console.log("Loggin the error", err);
    res.end();
  });
});

//---PASSPORT----

app.use(passport.initialize());
app.use(passport.session());

//---Github Authentication--

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log("successful sign in");
    console.log("The user id is", req.user);
    res.send();
    //res.redirect('/');
  });

//--Passport--


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
