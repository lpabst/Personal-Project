const express = require('express');
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

const techInfoCtrl = require('./controllers/techInfoCtrl.js');

app.get('/api/techinfo', techInfoCtrl.getAllTechInfo);




app.listen(3000, console.log('3000 yo'));
