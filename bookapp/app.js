var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('DB_Interface.js')
var login = require('./routes/login');
var profile = require('./routes/profile');
//ADDED THIS
var sequelize = require('sequelize');

var app = express();

var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 7 * 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

var pg = require('pg');
//put in your own connection here
var conString = "postgres://biancatamaskar:Amherst!415@localhost/UMass-Books";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);

app.post('/', function(req, res) {
  db.loginUser(req.body.username,req.body.password,res,req);
  //   pg.connect(conString, function(err, client) {
  //   var query = client.query({
  //     text: 'Select * from users where username =$1 and password =$2',
  //     values: [req.body.username, req.body.password]
  //   });
  //   query.on('row', function(row) {
  //     console.log(row);
  //        if (!row) {
  //           console.log('client is ending');
  //           client.end();
  //           res.render('/', { message: 'Invalid email or password.' });

  //         } else {
  //           if (req.body.password === row.password.replace(/\s+/g,'')) {
  //             // sets a cookie with the user's info
  //             req.session.user = row.username;
  //             console.log('redirect');
  //             res.redirect('/profile');
  //           } else {

  //             res.render('/', { message: 'Invalid email or password.' });
  //           }
  //         }
  //   });
  // });
});

//Home page
app.get('/home', function(req, res){

    res.render('home');

});

//get createlisting page
app.get('/createlisting', function(req, res) {
  res.render('createlisting');
});

//post createlisting
app.post('/createlisting', function(req, res) {
  if (req.session.user) {
    username = req.body.username;
    isbn13 = req.body.isbn13;
    forRent = req.body.forRent;
    forSale = req.body.forSale;
    forBorrow = req.body.forBorrow;
    available = req.body.available;
    db.makeListing(username, isbn13, forRent, forSale, forBorrow, available);
    res.redirect('/createlisting');
  } else {
    res.redirect('/');
  }
});

//searching for a book on the home page
// the /home needs to be the name of form action in home.ejs

// app.post('/home', function(req, res){
//   pg.connect(conString, function(err, client){
//     var query = client.query({
//       text:'SELECT listing.listid, book.title, listing.isbn13, listing.username FROM listing INNER JOIN book ON listing.isbn13=book.isbn13 where UPPER(book.title) LIKE Upper($1);',
//       values: [req.body.searchTerm]
//     });
//     query.on('row', function(row){
//       //if found, show all users that have it. this if statement needs to be changed, not right
//       if(row){
//         console.log('LISTING');
//         console.log("title: " +row.title);
//         console.log("listing ID: " +row.listid);
//         console.log("username: " +row.username);
//         console.log("---------------------");
//       }
//       //if not found, currently does not return. this is wrong
//       else{
//         console.log('Book was not found :(');
//       }
//     });
//   });
// });

app.post('/home', function(req,res){
  search = req.body.searchTerm;
  //db.searchBook(search, renderHome(res,record));
  db.postBookListing(search, res);
});

// function renderHome(res, record){
//   res.render('home',record);
// }

app.get('/profile', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    console.log(req.session.user);
    pg.connect(conString, function(err, client) {
    var query = client.query({
      text: 'Select * from users where username =$1',
      values: [req.session.user.replace(/\s+/g,'')]
    });
    query.on('row', function(row) {
         if (!row) {

        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        client.end();
        req.session.reset();
        res.redirect('/');
          } else {
            // expose the user to the template
            // render the profile page
            res.render('profile', { username: row.username, fname: row.firstname, 
              lname: row.lastname, email: row.email, phone: row.phone, school: row.institution });
          }
    });
  });
  } else {
    res.redirect('/');
  }
});

//handles logout
app.get('/logout', function(req, res) {
  console.log('logout');
  req.session.reset();
  res.redirect('/');
});

//handles get signup
app.get('/signup', function(req, res) {
  res.render('signup',{message:''});
});

var doNothing = function doNothing_(value)
{
  console.log(value);
}

//handles signup post, slow but uses db interface
app.post('/signup',function(req,res){
  username = req.body.username;
  password = req.body.password;
  fname = req.body.firstName;
  lname = req.body.lastName;
  email = req.body.email;
  phone = req.body.phone;
  school = req.body.institution;
  age = 0;
  sex = 'o';
  db.checkUser(username, password, age, fname, lname, sex, email, phone, school, res,req);
//     pg.connect(conString, function(err, client) {
//     var query = client.query({
//       text: 'Select * from users where username =$1',
//       values: [username]
//     });
//     query.on('row', function(row) {
//          if (row) {

//           console.log('username taken');
//             res.render('signup', { message: 'Username taken' });
//             // req.session.user = username;
//             // db.addUserBasic(username, password, age, fname, lname, sex, email, phone, school,res);
//           } else {
//             // window.alert("This username is not available. Please try another.");
//             // console.log('username taken');
//             // res.render('signup', { message: 'Username taken' });
//             // client.end();

//              req.session.user = username;
//             db.addUserBasic(username, password, age, fname, lname, sex, email, phone, school,res);
//           }
//     });
  
//   //res.redirect('/profile');
// });
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
