module.exports = function(app, express, passport) {
  var router = express.Router();

  router.get('/spotify', passport.authenticate('spotify'), function(req, res) {

  });
  router.get('/spotify/callback', passport.authenticate('spotify'), function(req, res) {
    res.redirect('/profile');
  });
  app.use('/auth', router);
};
