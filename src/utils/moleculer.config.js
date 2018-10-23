import os from "os";
import logger from "ff-utils/logger";
import config from "config";

module.exports = {
  transporter: config.moleculer.transporter,
  serializer: config.moleculer.serializer,
  // Append hostname to nodeID. It will be unique when scale up instances in Docker
  nodeID:
    "node-" +
    (process.pid ? process.pid + "-" : "") +
    (process.env.NODEID ? process.env.NODEID + "-" : "") +
    os.hostname().toLowerCase(),
  metrics: true,
  cacher: config.moleculer.cacher,
  logLevel: "info",
  hotReload: config.mode == "development" ? true : false,
  logger: config.moleculer.logger == true ? bindings => logger(bindings) : true,
  circuitBreaker: config.moleculer.circuitBreaker,
  retryPolicy: config.moleculer.retryPolicy
};
