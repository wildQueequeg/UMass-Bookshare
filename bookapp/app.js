var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var db = require('DB_Interface.js');
var app = express();

// Unnecessary lines?
app.set('views', __dirname + './views');
app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  res.render('index');
});

// create account page
app.get('/createaccount', function(req, res) {
  res.render('createaccount');
});

// profile page
app.get('/profile', function(req, res) {
  res.render('profilepage');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'node_modules')));

app.use('/', routes);
app.use('/users', users);
app.use('/registration', registration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

//DOES NOT WORK
app.use('registration', function(req, firstname, lastname, email, password) {
  db.addUser(null, password, null, firstname, lastname, null, email, null, null);
});
/*app.post('/registration', function(req, res, next) {
  console.log("WORKS!" + req.body.firstName);
});*/

module.exports = app;
