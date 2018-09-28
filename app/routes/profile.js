var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.render('profile', {appTitle: 'Profile', title: 'Profile', user: req.user});
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
