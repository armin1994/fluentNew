var _ = require("lodash");

module.exports = function authenticate() {
  return function authenticate(req, res, next) {
    var authenticator = this;
    var property = authenticator._userProperty || "user";
    if (req._passport.session && req._passport.session.user) {
      var { token } = req.session[this._key].user;
      var serializeUser = authenticator.getSession(token);
      serializeUser
        .then(user => {
          if (!user || _.isEmpty(user) || _.isUndefined(user)) {
            delete req._passport.session.user;
          } else {
            _.extend(user.d, {
              token: token
            });
            req[property] = user.d;
          }
          next();
        })
        .catch(err => {
          delete req._passport.session.user;
          console.log(err);
          next();
        });
    } else {
      next();
    }
  };
};
