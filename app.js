const express = require('express');
const  path = require('path');
const  routes = require('./routes/index');
const  app = express();
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + "/public"))
app.use(express.static('public'));
app.use(express.json());
app.use('/',routes);
module.exports = app;
