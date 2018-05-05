const express = require('express');
const router = express.Router();

/* GET home redirect. */
router.get('/', function(req, res, next) {
    res.redirect('/projects');
});

/* GET index listing. */
router.get('/api', function(req, res, next) {
    res.send('Api Route Works!');
});

router.use('/index', require('./index'));
router.use('/users', require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;