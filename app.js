
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {'title': 'Forever Collar'});
})

app.post('/find', function(req, res) {
  // Download the Node helper library from twilio.com/docs/node/install
  // These vars are your accountSid and authToken from twilio.com/user/account
  var accountSid = 'AC5d2d4a989ff8286db2955049233379b9';
  var authToken = "9621f4fd26aa65dc95306a3c9deb5785";
  var client = require('twilio')(accountSid, authToken);
  var coords = [];
   
  client.messages.list(function(err, data) {

      data.messages.forEach(function(message) {
          if (message.from === req.body.number) {
            try {
              var lat_str = message.body.split(",")[0];
              var lng_str = message.body.split(",")[1];
              var lat = parseFloat(lat_str);
              var lng = parseFloat(lng_str);
              coords.push({'lat': lat, 'lng': lng});
            } catch (e) {
              console.log(e);
            }
          }
      });
      console.log(coords);
      res.send(coords);
  });
});

app.get('/:number', function(req, res) {
    // Download the Node helper library from twilio.com/docs/node/install
  // These vars are your accountSid and authToken from twilio.com/user/account
  var accountSid = 'AC5d2d4a989ff8286db2955049233379b9';
  var authToken = "9621f4fd26aa65dc95306a3c9deb5785";
  var client = require('twilio')(accountSid, authToken);
  var coords = [];
   
  client.messages.list(function(err, data) {

      data.messages.forEach(function(message) {
          if (message.from === req.params.number) {
            try {
              var lat_str = message.body.split(",")[0];
              var lng_str = message.body.split(",")[1];
              var lat = parseFloat(lat_str);
              var lng = parseFloat(lng_str);
              coords.push({'lat': lat, 'lng': lng});
            } catch (e) {
              console.log(e);
            }
          }
      });
      console.log(coords);
      res.json(coords);
  });
})


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
