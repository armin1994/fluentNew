import express from "express";
import engineIO from "engine.io";
import Primus from "primus";
import binaryPack from "ff-utils/binarypack";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import Emitter from "primus-emitter";
import Multiplex from "primus-multiplex";
import Substream from "substream";
import cookieParser from "cookie-parser";
import config from "config";
import cors from "cors";
import _ from "lodash";
import Boom from "ff-utils/boom";
import { renderAdmin } from "ff-utils/renderPage";
import Dist from "ff-utils/dist";
import ioRoutes from "./io/index";
import apiRoute from "./api.route";
import { sessionM, PassportM, PassportSession } from "ff-utils/sessionStore";
import httpsRedirect from "ff-utils/redirect";
const App = express();
const Router = express.Router();
Dist(App);
const httpServer = http.createServer(App);
const io = new Primus(httpServer, {
  transformer: "engine.io",
  parser: binaryPack
});

const parseMyCookies = cookieParser(config.redis.secret);

App.use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(parseMyCookies)
  .use(sessionM)
  .use(PassportM)
  .use(PassportSession)
  .use(Boom());

App.use('/api', apiRoute);
// render html page with server side componenets using redux
App.use("/", httpsRedirect(false, ["/-/d/", "/record", "/cleaning"]))
  .use("/-/d/", renderAdmin)
  // .use("/record", renderRS)
  // .use("/cleaning", renderCS)
  .disable("x-powered-by");

io.use("session", (req, res, next) => {
  sessionM(req, {}, next);
});

io.use("passport", (req, res, next) => {
  PassportM(req, {}, next);
});

io.plugin("multiplex", Multiplex)
  .plugin("emitter", Emitter)
  .plugin("substream", Substream);



// Save primus client library
io.save(__dirname + "/../../public/js/primus.js");

/**
 * Create premius client to connect to backend server.
 */
const Socket = Primus.createSocket({
  transformer: "engine.io",
  parser: binaryPack,
  plugin: {
    emitter: Emitter,
    multiplex: Multiplex,
    substream: Substream
  }
});
const ioClient = new Socket(config.socketServer);

// Socket middleware to share session between express and socket
ioRoutes(io, ioClient);

const server = httpServer.listen(config.server.port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
