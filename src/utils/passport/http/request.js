/**
 * Module dependencies.
 */
var _ = require("lodash");
// If flatiron/union is being used, then bind the following
// functions to the RoutingStream Prototype
try {
  var union = require("union"),
    req = union.RoutingStream.prototype;
} catch (ex) {
  // Otherwise, bind to the native http.req prototype
  var http = require("http"),
    req = http.IncomingMessage.prototype;
}

/**
 * Intiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login = req.logIn = function(user, done) {
  if (!this._passport)
    throw new Error("passport.initialize() middleware not in use");

  var property = this._passport.instance._userProperty || "user";

  this[property] = user;

  var self = this;
    var token = this._passport.instance.createSession(user);
    token
      .then(result => {
        var encodedToken = this._passport.instance.generateHash(result.token);
        _.extend(user, {
          token: encodedToken
        });
        self._passport.session.user = user;
        // req.session.save();
        done(null, user);
      })
      .catch(err => {
        self[property] = null;
        return done(err, null);
      });
 
  // this._passport.instance.serializeUser(user, function(err, obj) {
  //   if (err) {
  //     self[property] = null;
  //     return done(err);
  //   }
  //   self._passport.session.user = obj;
  //   done();
  // });
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout = req.logOut = function() {
  if (!this._passport)
    throw new Error("passport.initialize() middleware not in use");

  var property = this._passport.instance._userProperty || "user";

  this[property] = null;
  delete this._passport.session.user;
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = "user";
  if (this._passport && this._passport.instance._userProperty) {
    property = this._passport.instance._userProperty;
  }

  return this[property] ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};
