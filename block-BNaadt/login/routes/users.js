var express = require('express');
var router = express.Router();

var User = require('../model/user-login');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.session);
  res.render('users');
});

// login form
router.get('/login', function (req, res, next) {
  var error = req.flash('error')[0];
  console.log(error);
  res.render('login', { error });
});

router.get('/registration', function (req, res, next) {
  res.render('registration');
});

router.post('/registration', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    console.log(user);
    res.redirect('/users');
  });
});

router.post('/login', function (req, res, next) {
  var { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    req.flash('error', 'Email/Password required');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    // no user
    if (!user) {
      return res.redirect('/users/login');
    }
    // campare password
    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (err) return next(err);
      if (!result) {
        return res.redirect('/users/login');
      }
      // parsist logged in user information
      req.session.userId = user.id;
      res.redirect('/users');
    });
    0;
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
