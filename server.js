var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', require('./routes'));
app.use(express.static(__dirname +'/public'));


var server = app.listen(8081, function () {
	console.log("Listening at http://localhost:8081")
});