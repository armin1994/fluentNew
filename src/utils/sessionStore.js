import connectRedis from "connect-redis";
import session from "express-session";
import config from "config";
import RedisSessions from "redis-sessions";
const redisStore = connectRedis(session);

import Authenticator from "ff-utils/passport/authenticator";
import TokenManagerInstance from "./tokenManager";

// Redis session store
export const sessionStore = new redisStore({
  host: config.redis.host,
  port: config.redis.port,
  pass: config.redis.pass,
  logErrors: true
});

// Session middleware
export const sessionM = session({
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  secret: config.redis.secret,
  overwrite: true,
  cookie: {
    secure: false,
    httpOnly: true
  }
});

export const passportStore = new RedisSessions({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.pass
});

export const TokenManager = TokenManagerInstance.init({
  store: passportStore,
  secret: config.redis.secret
});

export const PassportM = Authenticator.init({
  store: passportStore,
  secret: config.redis.secret
});

export const PassportSession = Authenticator.initializeSession();

export default sessionStore;
