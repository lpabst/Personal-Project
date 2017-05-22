const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require('./../config.js');

const app = module.exports = express();

var massiveInstance = massive.connectSync({
    connectionString: config.connectionString
});

app.set('db', massiveInstance);
var db = app.get('db');

app.use(bodyParser.json());







const techIconCtrl = require('./controllers/techIconCtrl.js');

app.get('/api/icons', techIconCtrl.getAllIcons);
app.get('/api/icons/:name', techIconCtrl.getIconByName);


app.listen(3000, console.log('3000 yo'));

