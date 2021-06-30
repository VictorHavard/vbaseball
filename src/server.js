const express           = require('express');
const bodyParser	      = require('body-parser');
const mustacheExpress   = require('mustache-express');
const methodOverride    = require('method-override');
const db                = require('./db.js');

console.dir("Includes complete");

console.dir("Defining variables");
global.app = express();

app.engine('html', mustacheExpress());

app.use(express.static(__dirname + '/public')); // set static folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true } ));
app.use(methodOverride('_method'));

var mongoPort = "27017";
var dbName = "vbaseball";
var mongoHost = "localhost";

global.conf = {
	"apiPort": "5564",
	"httpPort": "8080",
  "mongo": {
    "collections": [
      "clubs",          // Team sanctioning bodies
      "teams",          // Teams
      "venues",         // Ballparks
      "umpireOrgs",     // Umpiring Organizations
      "games"           // Game
    ],
    "url": `mongodb://${mongoHost}:${mongoPort}/${dbName}`,
    "dbName": dbName
  }
};

if(!db.init()) {
  console.error("Failed to initialize database, cannot continue...");
  exit;
}
console.dir("Database initialized");

console.dir("Defining endpoints...");
app.get('/', function(req, res) {
  console.dir('GET /');
  // Return the main html page
  res.render('index', {
    index: {
      var: "value"
    }
  });
});

// EVENTS
console.dir("Defining Clubs paths...");
app.get('/clubs', function(req, res) {
  console.dir('GET /clubs');
  var data = req.body;
  console.dir(data);

  /*
  clubs.getClubData(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
  */
});

app.post('/clubs', function(req, res) {
  console.dir('POST /clubs');
  var data = req.body;
  console.dir(data);
});

// Delete an event from the timeline
app.delete('/clubs', function(req, res) {
  console.dir('DELETE /clubs');
  var data = req.body;
  console.dir(data);
});

// Update an event from the timeline
app.put('/clubs', function(req, res) {
  console.dir('PUT /clubs');
  var data = req.body;
  console.dir(data);
});

// Venues
console.dir("Defining Venues paths...");
app.get('/venues', function(req, res) {
  console.dir('GET /venues');
  var data = req.body;
  console.dir(data);
  /*
  venues.getVenueData(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
  */
});

app.post('/venues', function(req, res) {
  console.dir('POST /venues');
  var data = req.body;
  console.dir(data);
});

// Delete an event from the timeline
app.delete('/venues', function(req, res) {
  console.dir('DELETE /venues');
  var data = req.body;
  console.dir(data);
});

// Update an event from the timeline
app.put('/venues', function(req, res) {
  console.dir('PUT /venues');
  var data = req.body;
  console.dir(data);
});

// Umpires
console.dir("Defining Umpires paths...");
app.get('/umpires', function(req, res) {
  console.dir('GET /umpires');
  var data = req.body;
  console.dir(data);
  /*
  umpires.getUmpireData(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
  */
});

app.post('/umpires', function(req, res) {
  console.dir('POST /umpires');
  var data = req.body;
  console.dir(data);

});

// Delete an event from the timeline
app.delete('/umpires', function(req, res) {
  console.dir('DELETE /umpires');
  var data = req.body;
  console.dir(data);
});

// Update an event from the timeline
app.put('/umpires', function(req, res) {
  console.dir('PUT /umpires');
  var data = req.body;
  console.dir(data);
});

// Tournament Hosts
console.dir("Defining Tournament paths...");
app.get('/hosts', function(req, res) {
  console.dir('GET /hosts');
  var data = req.body;
  console.dir(data);
  /*
  hosts.getHostData(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
  */
});

app.post('/hosts', function(req, res) {
  console.dir('POST /hosts');
  var data = req.body;
  console.dir(data);

  globalEvent.addEventType(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
});

// Delete an event from the timeline
app.delete('/hosts', function(req, res) {
  console.dir('DELETE /hosts');
  var data = req.body;
  console.dir(data);
});

// Update an event from the timeline
app.put('/hosts', function(req, res) {
  console.dir('PUT /hosts');
  var data = req.body;
  console.dir(data);
});

// Games
console.dir("Defining Game paths...");
app.get('/games', function(req, res) {
  console.dir('GET /games');
  var data = req.body;
  console.dir(data);
  /*
  hosts.getHostData(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
  */
});

app.post('/games', function(req, res) {
  console.dir('POST /games');
  var data = req.body;
  console.dir(data);

  globalEvent.addEventType(data)
  .then((result) => {
    console.dir(result)
    res.status(200).send(result);
  }).catch((error) => {
    console.dir(error)
    res.status(error.code).send(error.message);
  });
});

// Delete an event from the timeline
app.delete('/games', function(req, res) {
  console.dir('DELETE /games');
  var data = req.body;
  console.dir(data);
});

// Update an event from the timeline
app.put('/games', function(req, res) {
  console.dir('PUT /games');
  var data = req.body;
  console.dir(data);
});

app.listen(conf.httpPort, function() {
	console.dir(`Web Server starting on port ${conf.httpPort}`);
});

app.listen(conf.apiPort, function() {
	console.dir(`API Server starting on port ${conf.apiPort}`);
});
