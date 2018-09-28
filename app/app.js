var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
var app = express();

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard-cat',
  resave: true,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//No esta en documentacion
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//

passport.use(
  new SpotifyStrategy(
    {
      clientID: 'dc9bc873aabd426f985865a0c3ff8964',
      clientSecret: '15af9d4895724179820c291304c350fd',
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
        return done(null, profile);
    }
  )
);

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
// app.use('/auth', authRouter);
var authRouter = require('./routes/auth') (app, express, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;