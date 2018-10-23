var util = require('util');

module.exports = function initialize() {
  return function initialize(req, res, next) {
    var passport = this;
    req._passport = {};    
    req._passport.instance = passport;

    if (req.session && req.session[passport._key]) {
      // load data from existing session
      req._passport.session = req.session[passport._key];
    }
    next();
  };
};