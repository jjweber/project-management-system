var express = require('express');
var router = express.Router();

/* GET index listing. */
router.get('/', function(req, res, next) {
  res.send('Index Route Works!');
});


module.exports = router;
