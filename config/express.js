"use strict";

let express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  flash = require('flash'),
  localStrategy = require('passport-local').Strategy,
  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views','../app/views');
app.set('view engine', 'ejs');


// passport config
let Account = require('../app/models/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/social_network_kata');

// error handler - will print stack trace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
