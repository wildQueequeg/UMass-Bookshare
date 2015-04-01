var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/listing', function(req, res, next) {
  res.render('listing');
});

module.exports = router;
