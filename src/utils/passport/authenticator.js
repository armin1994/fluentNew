var jwt = require("jsonwebtoken");
var config = require("config");
var _ = require("lodash");
var initialize = require("./initialize");
var authenticate = require("./authenticate");
var uuid = require("uuid");

function Authenticator(options) {
  var opts = options || {};
  this._key = "passport";
  this._userProperty = "user";
  this._appName = "FluentFront_v1";
  this.session = {};
}

Authenticator.prototype.init = function(options) {
  options = options || {};
  if (options.store === undefined) {
    throw new TypeError("store must be needed");
  }
  if (Array.isArray(options.secret) && options.secret.length === 0) {
    throw new TypeError("secret option array must contain one or more strings");
  }
  this.secret = options.secret;
  this.store = options.store;
  this.ttl = options.ttl || 3600;
  this._ip = options.ip || "127.0.0.1";
  return initialize().bind(this);
};

Authenticator.prototype.initializeSession = function() {
  return authenticate().bind(this);
};

Authenticator.prototype.isAuthenticated = function(req, roles) {
  var property = "user";
  if (!roles) return false;
  const { user = null } = req.session[this._key] || {};
  return user && _.includes(roles, user.userType) ? true : false;
};

Authenticator.prototype.isUnauthenticated = function() {
  return !this.isAuthenticated();
};

Authenticator.prototype.login = function(user, { _passport, session }) {
  var property = this._userProperty || "user";
  var isSession = session === undefined ? true : session;
  var self = this;
  if (isSession) {
    return new Promise((resolve, reject) => {
      var token = this.createSession(user);
      token
        .then(res => {
          var encodedToken = this.generateHash(res.token);
          _.extend(user, {
            token: encodedToken,
            sToken : uuid.v4()
          });
          if (!_passport.session) {
            _passport.session = {};
          }
          _passport.session.user = user;
          session[this._key] = _passport.session;
          session.save();
          resolve(user);
        })
        .catch(err => {
          self.session[property] = null;
          console.log(err);
          reject(err);
        });
    });
  }
};

Authenticator.prototype.updateCookieSession = function(session) {
  return new Promise((resolve, reject) => {
    try {
      session.reload(function() {
        session.touch().save();
        resolve(session);
      });
    } catch (err) {
      reject(err);
    }
  });
};

Authenticator.prototype.updateUser = function(user, { _passport, session }) {
  var property = this._userProperty || "user";
  var isSession = session === undefined ? true : session;
  var self = this;
  if (isSession) {
    return new Promise((resolve, reject) => {
      var { token } = session.passport.user;
      var decodedToken = this.decodeHash(token);
      var updateUser = this.updateSession(decodedToken, user);
      updateUser
        .then(res => {
          var getUser = this.getSession(token);
          var { d } = res;
          _.extend(d, {
            token: token
          });
          session[this._key].user = d;
          session.save();
          resolve(d);
        })
        .catch(err => {
          self.session[property] = null;
          reject(err);
        });
    });
  }
};

Authenticator.prototype.logout = function(req) {
  var { token } = req.session[this._key].user;
  var self = this;
  if (token) {
    var deleteToken = this.deleteSession(token);
    deleteToken
      .then(() => {
        delete req.session[this._key].user;
        req.session.destroy();
      })
      .catch(err => err);
  }
};

Authenticator.prototype.createSession = function(user) {
  return new Promise((resolve, reject) => {
    const { _id: userID = _.now } = user;
    this.store.create(
      {
        app: this._appName,
        id: userID,
        ttl: this.ttl,
        ip: this._ip,
        d: user
      },
      function(err, resp) {
        if (err) reject(err);
        resolve(resp);
      }
    );
  });
};

Authenticator.prototype.updateSession = function(token, user) {
  return new Promise((resolve, reject) => {
    this.store.set(
      {
        app: this._appName,
        token: token,
        d: user
      },
      function(err, resp) {
        if (err) reject(err);
        resolve(resp);
      }
    );
  });
};

Authenticator.prototype.getSession = function(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      var decodedToken = this.decodeHash(token);
      this.store.get(
        {
          app: this._appName,
          token: decodedToken
        },
        function(err, resp) {
          if (err) reject(err);
          resolve(resp);
        }
      );
    } else {
      resolve(null);
    }
  });
};

Authenticator.prototype.deleteSession = function(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      var decodedToken = this.decodeHash(token);
      this.store.kill(
        {
          app: this._appName,
          token: decodedToken
        },
        function(err, resp) {
          if (err) return err;
          resolve();
        }
      );
    } else {
      reject();
    }
  });
};

Authenticator.prototype.wrapToken = function(data, req) {
  var property = this._userProperty || "user";
  if (req.session[this._key].user) {
    var user = req.session[this._key].user;
    var { type = null, token } = user;
    return _.extend(data, {
      auth: {
        token: token,
        type: type,
        user: user
      }
    });
  } else return data;
};

Authenticator.prototype.generateHash = function(token) {
  return jwt.sign(token, this.secret);
};

Authenticator.prototype.decodeHash = function(token) {
  return jwt.verify(token, this.secret);
};

exports = module.exports = new Authenticator();
