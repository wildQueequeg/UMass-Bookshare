var express         = require("express")
  , http            = require('http')
  , fs              = require('fs')
  , url             = require('url')
  , bodyParser      = require('body-parser')
  ;

var router = express.Router();
var models = require('DB_Interface.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UMass Bookshare'
	});
});

module.exports = router;

