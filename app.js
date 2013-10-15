
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/blogmanager');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var personController = require('./app/controllers/person-controller.js');
app.post('/people', personController.post);
app.put('/people/:id', personController.put);
app.get('/people/list', personController.list);
app.get('/people/create', personController.details);
app.get('/people/:id', personController.details);


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/mainpage', routes.mainpage);
// app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser); 
app.post('/sendemail', routes.send);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
