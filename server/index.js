var express = require('express');
var bodyParser = require('body-parser');
var models = require('./models');

var port = process.env.PORT || 3000;
var app = express();

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/react-client/dist'));

app.get('/users', function(req, res) {
  models.users()
  .then((result)=>{
    res.end(JSON.stringify(result));
  });
});


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
