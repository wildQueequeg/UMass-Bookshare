var express         = require("express")
  , http            = require('http')
  , fs              = require('fs')
  , url             = require('url')
  , bodyParser      = require('body-parser')
  ;

var router = express.Router();
var models = require('DB_Interface.js');

router.get('/', function(req, res, next) {
  res.render('createaccount');
});


module.exports = router;
