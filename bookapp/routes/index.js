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


//<----------------------------------------------- OLD CODE ------------------------------------------------------------>
/*router.use(bodyParser.json());
router.use(bodyParser.urlencoded({  extended: true}));
router.use(express.json());       // to support JSON-encoded bodies
*/

/*router.post('/createUser', function(req, res, next) {
	console.log("WORKS!" + req.body.firstName);
});*/

  //models.addUser("TestTestTest", "abc", 21, "Test", "Test","m","test@gmail.com", "555555555", "UMass");