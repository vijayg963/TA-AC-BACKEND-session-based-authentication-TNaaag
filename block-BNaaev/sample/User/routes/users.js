var express = require('express');
var router = express.Router();

var User = require('../model/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/registration', function (req, res, next) {
  res.render('registration');
});

router.post('/registration', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    console.log(user);
    res.redirect('/users/registration');
  });
});

module.exports = router;
