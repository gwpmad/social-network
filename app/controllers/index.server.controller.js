"use strict";

exports.render = function(req, res) {
  if (req.user) {
//    res.redirect('/main', {
//      user: req.user
//    });
  }
    else {
    res.render('register', {
      user: ''
    });
  }
};
