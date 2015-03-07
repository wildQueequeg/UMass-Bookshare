var express         = require("express")
  , http            = require('http')
  , fs              = require('fs')
  , url             = require('url')
  , bodyParser      = require('body-parser')
  ;

var router = express.Router();
var db = require('DB_Interface.js');

router.get('/', function(req, res, next) {
  res.render('createaccount');
});

//DOES NOT WORK
router.get('/', function(req, res, next) {
	models.addUser("test","test", 21, "Test", "Test","m","test@gmail.com", "555555555", "UMass");
	models.addUser(null, req.body.password, req.body.age, req.body.firstName, req.body.lastName, req.body.sex, req.body.email, null, null);
});
/*models.addUser(,, 21, "Test", "Test","m","test@gmail.com", "555555555", "UMass");
*/
module.exports = router;
