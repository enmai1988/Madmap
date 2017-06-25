var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
// process.env.PWD = process.cwd();
// console.log("The process variable is", process.cwd());
// console.log("Directory name is: ", __dirname);
var app = express();

// app.use(express.static(__dirname + '/../react-client/dist'));
//app.use('/', express.static(__dirname)); 
process.env.PWD = process.cwd();
//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(process.env.PWD + '/react-client/dist'));


// app.get('/', function(req,res) {
//   res.sendFile('/../react-client/dist');
// }) 
// app.get('/', function(req, res) {
//   res.send('hello world!');
// });

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

