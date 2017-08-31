var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Models = require('./models');
var passport = require('./authentication/passport');
var morgan = require('morgan');
var session = require('express-session');
const randomBytes = Promise.promisify(require('crypto').randomBytes);
const createHash = require('crypto').createHash;
const request = require('request');
const config = require('config')['mailgun'];

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/'));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(session({ secret: 'mad cat', resave: true, saveUninitialized: true }));
//---PASSPORT----

app.use(passport.initialize());
app.use(passport.session());

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

app.get('/api', (req, res ) => {
  res.send({GOOGLE_API_KEY: process.env.GOOGLE_API_KEY});
});

app.get('/user/signedIn', isAuth, (req, res) => {
  res.send(req.user);
});

app.get('/user', (req, res) => {
  Models.users.get()
    .then((result)=>{
      res.end(JSON.stringify(result));
    })
    .catch((err)=>{
      console.log('Loggin the error', err);
      res.end();
    });
});

app.get('/friend/:id', (req, res) => {
  Models.friends.get(req.params.id).then(list => {
    if (!list) { throw list; }
    res.send(list);
  }).catch(() => {
    res.sendStatus(404);
  });
});

app.post('/friend/:id', (req, res) => {
  Models.friends.addFriend(req.body.userId, req.body.friendId)
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    }).catch(() => {
      res.sendStatus(500);
    });
});

app.post('/map', (req, res) => {
  var state = req.body.state;
  state.currentCenter = `${state.currentCenter.lat}/${state.currentCenter.lng}`;
  var mapId = null;
  Models.maps.create(state)
    .then((result) => {
      mapId = result[0]['currval'];
      return Promise.map(state.markers, marker => {
        var mark = {
          'lat': marker.position.lat,
          'lng': marker.position.lng,
          'mapId': parseInt(mapId),
          'eventName': marker.eventName,
          'eventDate': marker.eventDate,
          'eventTime': marker.eventTime,
          'iconPath': marker.icon.path,
          'fillColor': marker.icon.fillColor,
          'strokeColor': marker.icon.strokeColor
        };
        return Models.markers.create(mark);
      })
        .then((result) => {
          res.end(mapId);
        });
    })
    .catch((err) => {
      console.log('There was an error:', err);
      res.end();
    });
});

app.get('/map/:mapId', (req, res) => {
  Models.maps.get(req.params.mapId)
    .then((result) => {
      console.log('The state is,', result);
      res.send(result); //TODO figure out how to send back the hash with all the data.
    })
    .catch((err)=>{
      console.log('There was an error:', err);
      res.end();
    });
});

app.put('/map/:mapId', (req, res) => {
  console.log(req.body);
  Models.maps.update(req.params.mapId)
    .then((result)=>{
      res.end();
    })
    .catch((err)=>{
      res.end();
    });
});

app.get('/maps/:userId', (req, res) => {
  // console.log('User ID from req.params ', req.params.userId)
  Models.maps.userGet(req.params.userId)
    .then((result) => {
      console.log('SERVER RESULT ', result);
      res.send(result);
    })
    .catch((err) => {
      res.end();
    });
});

app.post('/map/share', (req, res) => {
  console.log('share map: ', req.body);
  request({
    method: 'POST',
    url: 'https://api.mailgun.net/v3/sandbox3d24a85bbb724152b3cd16a95f41df52.mailgun.org/messages',
    qs: {
      from: 'notifications@madmap.io',
      to: req.body.emailAddress,
      subject: `${req.body.user.firstname} ${req.body.user.lastname} has shared a map with you`,
      html: `
        <h1>Mad Maps</h1>
        <h3>${req.body.user.firstname} ${req.body.user.lastname} has shared a map with you.</h3>
        <h5>To view the map simply click on the below link.<br><br>
          ${req.body.mapUrl}
        </h5>`
    },
    auth: {
      user: 'api',
      pass: config.api_key
    }
  })
    .on('response', function(response) {
      res.send(response);
    });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'public_profile', 'email' ] }) );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//--Passport--

app.post('/login', passport.authenticate('local'),
  ((req, res) => {
    res.send(req.body.email);
  })
);

const registerUser = (req, res, next) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let salt;
  randomBytes(256)
    .then(buf => {
      salt = buf.toString('hex');
      console.log(salt);
      return Promise.resolve(createHash('sha256').update(password + salt));
    })
    .then(hashObj => {
      return Models.users.saveUser(username, hashObj.digest('hex'), salt);
    })
    .then(success => {
      console.log('in in in');
      next();
    })
    .catch(err => console.log('err in registering:', err));
};

app.post('/signup', registerUser, (req, res) => {
  res.send('saved');
});


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
