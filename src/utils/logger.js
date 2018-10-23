import { createLogger, format } from "winston";
import logsene from "winston-logsene";
import config from "config";

const { combine, label, timestamp, json } = format;
/**
 * Create a logger using Logsene transporter
 */
const logger = bindings => {
  const logger = createLogger({
    format: combine(label({ label: bindings }), timestamp(), json()),
    transports: [
      new logsene({
        token: config.logsene_token
      })
    ]
  });
  return logger;
};

export default logger;
