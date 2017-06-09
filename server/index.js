const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require('./../config.js');

const app = module.exports = express();

app.use(express.static(__dirname + './../dist'));

var massiveInstance = massive.connectSync({
    connectionString: config.connectionString
});
app.set('db', massiveInstance);
var db = app.get('db');

app.use(bodyParser.json());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

const techInfoCtrl = require('./controllers/techInfoCtrl.js');
const statsCtrl = require('./controllers/statsCtrl.js');

app.get('/api/techinfo', techInfoCtrl.getAllTechInfo);
app.get('/api/getStats', statsCtrl.getGameshowStats)

app.put('/api/updateStats', statsCtrl.updateStats);

app.listen(3000, console.log('3000 yo'));