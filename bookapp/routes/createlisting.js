var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/createlisting', function(req, res, next) {
  res.render('createlisting');
});

module.exports = router;
