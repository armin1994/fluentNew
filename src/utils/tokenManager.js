import jwt from "jsonwebtoken";

function TokenManager() {
  this._key = "TokenManager";
  this._userProperty = "user";
  this._appName = "FluentFront_v1";
  this.session = {};
}

TokenManager.prototype.init = function(options) {
  var opts = options || {};
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
  var self = this;
  return function init(req, res, next) {
    req._TokenManager = {};
    req._TokenManager.instance = self;
    next();
  };
};

TokenManager.prototype.createSession = function(user) {
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

TokenManager.prototype.getSession = function(token) {
  var decodedToken = this.decodeHash(token);
  return new Promise((resolve, reject) => {
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
  });
};

TokenManager.prototype.deleteSession = function(token) {
  var decodedToken = this.decodeHash(token);
  return new Promise((resolve, reject) => {
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
  });
};

//   TokenManager.prototype.wrapToken = function(data) {
//     var property = this._userProperty || "user";
//     if (this.session[property] || this.session.user) {
//       var { type = null, token } = this.session.user;
//       return _.extend(data, {
//         auth: {
//           token: token,
//           type: type
//         }
//       });
//     } else return data;
//   };

TokenManager.prototype.generateHash = function({token}) {
  return jwt.sign(token, this.secret);
};

TokenManager.prototype.decodeHash = function(token) {
  return jwt.verify(token, this.secret);
};


exports = module.exports = new TokenManager();
