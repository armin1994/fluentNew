import config from "config";
import { ServiceBroker, Errors } from "moleculer";
import moleculerConfig from "ff-utils/moleculer.config";
const { MoleculerError } = Errors;

/**
 * Create a service broker for moleculer
 */
let broker = new ServiceBroker(moleculerConfig);
broker.start();

/**
 * Call an action
 */
const callAction = async (
  action,
  payload,
  cb,
  err = err => {
    const { type, code, message } = err;
    console.log("",type, code, message);
  }
) => {
  /**
   * Wait for "backend" service then call an action
   */
  broker.waitForServices("backend").then(async () => {
    try {
      const response = await broker.call(action, payload);
      /**
       * send response back
       */
      cb(response);
    } catch (e) {
      /**
       * Check for an error
       */

      err(e);
    }
  });
};

export default callAction;

// callAction("users.hello", { email: "nileshsavani09@gmail.com" }, response => {
//   console.log(response);
// });
