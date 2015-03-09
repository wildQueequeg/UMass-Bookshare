var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var sequelize = require('sequelize');
var registration = require('./routes/registration');
var profile = require('./routes/profile');
var db = require('./models/DB_Interface');
var app = express();

// Unnecessary lines?
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + './views');
app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


// index page
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/profile',function(req,res){
  var user_name=req.body.user;
  console.log(req.body);
  var password=req.body.password;
  console.log("From Client pOST request: User name = "+user_name+" and password is "+password);
  res.end("yes");
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
app.use('/profile', profile);

/*var seqDB = new Sequelize('UMass-Books', 'sirdoan', 'dc0cy8ka', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
