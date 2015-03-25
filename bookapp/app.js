var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var home = require('./routes/home');
var search = require('./routes/search');
var listing = require('./routes/listing');
var test = require('./routes/test');
var sequelize = require('sequelize');
var registration = require('./routes/registration');
var profile = require('./routes/profile');
var db = require('./models/DB_Interface');
var app = express();
var username = null; 
var fname, lname, password, email, school, phone;

var pg = require('pg');
var conString = "postgres://postgres:postgres@localhost/UMass-Books";

// Unnecessary lines?
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + './views');
app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/createaccount', function(req, res) {
  res.render('createaccount');
});

app.get('/profile', function(req, res) {
  res.render('profilepage', { username: username, fname: fname, lname: lname, 
    email: email, phone: phone, school: school });
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/home', function(req, res) {
  res.render('home');
});

app.get('/search', function(req, res) {
  res.render('search');
});

app.get('/createlisting', function(req, res) {
  res.render('createlisting');
});

app.get('/listing', function(req, res) {
  res.render('listing');
});

// Testing page
app.get('/test', function(req, res) {
  res.render('test');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'views')));

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
  pg.connect(conString, function(err, client) {
    var query = client.query('SELECT * FROM Users');

    query.on('row', function(row) {
      console.log(JSON.stringify(row));
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

app.post('/asd',function(req,res){
   pg.connect(conString, function(err, client) {
    var query = client.query({
      text: 'Select * from users where username =$1 and password =$2',
      values: [req.body.user, req.body.password]
    });
    query.on('row', function(row) {
      username = row.username;
      fname = row.firstame;
      lname = row.lastname;
      email = row.email;
      phone = row.phone;
      school = row.institution;
      console.log(JSON.stringify(row));
    });
  });
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