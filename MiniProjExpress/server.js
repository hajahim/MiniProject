var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var path = require('path');
var methodOverride = require('method-override');

var app = express();

var port = process.env.PORT || 8080;

app.use("/dist", express.static(path.join(__dirname, '/node_modules')));
app.use("/static", express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(session({secret: 'todotopsecret'}));

require('./app/routes')(app);

app.listen(port);   

console.log('Le Serveur démarre sur le port : ' + port); 

exports = module.exports = app; 