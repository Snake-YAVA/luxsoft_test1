var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
//var async = require('async'); 	
var ejs = require('ejs');

var app = express();
app.set('port', 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);
app.use(express.static(path.join(__dirname, 'public')));


var server = http.createServer(app);

server.listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port')); 
});