var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User Route Works!');
});

/*******************************/
/* Get User Create Form Route. */
/*******************************/
router.get('/createForm', function(req, res, next) {
  User.find({})
  .exec(function(err, users) {
      if(err) {
      console.log('Error retrieving users');
      } else {
        res.render('management/createUser', { title: 'Project Management', users: users });
      }
      console.log(users);
  });
});

/****************************/
/* POST Save Project Route. */
/****************************/
router.post('/user-save', function(req, res) {
  console.log('Post a user: ', req.body);

  const newUser = new User();
  newUser.usersName = req.body.userName,
  newUser.save(function(err, insertednewUser) {
      if(err) {
        console.log('Error saving user');
      } else {
        res.redirect('/');
      }
  });
});

module.exports = router;
