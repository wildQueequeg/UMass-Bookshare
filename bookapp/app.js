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
var username = null; 
var fname, lname, password, email, school, phone;

var pg = require('pg');
var conString = "postgres://username:password@localhost/database";

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

// create account page
app.get('/createaccount', function(req, res) {
  res.render('createaccount');
});

// profile page
app.get('/profile', function(req, res) {
  res.render('profilepage', { username: username, fname: fname, lname: lname, 
    email: email, phone: phone, school: school });
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

//adds to database, need to refine more
app.post('/profile',function(req,res){
  username = req.body.user;
  password = req.body.password;
  fname = req.body.fname;
  lname = req.body.lname;
  email = req.body.email;
  phone = req.body.phone;
  school = req.body.school;
  db.addUser(username, password, fname, lname, email, phone, school);
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from users where ' + username + 'AND ' + password, function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    client.end();
  });
});
  res.send('yes');
});

app.post('/profile',function(req,res){
  console.log("hello");
  var found = null;
  //db.loginUser(req.body.user, req.body.password);
  db.UsersTable.find({
      where: {username: req.body.user, password:req.body.password},
      
   }).success(function(match) {
      found = res.json(match);
  });
  console.log(found);
  console.log("SUCCESS");
  res.send('yes');
});


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