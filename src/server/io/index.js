// import SERVER from "ff-rpc/index";
import _ from "lodash";
// import loadAction from "./controllers/loadAction";
// import { parseAction } from "./controllers/functions";

export default (io, ioClient) => {
  /**
   * Create Channel to communicated with Browser.
   */
//   const SERVER = io.channel("server");
  /**
   * Create Channel for FluentService (WakePhrase)
   */

  io.on("connection", socket => {
    console.log("Connected :-> ", socket.id);
  });

  io.on("error", error => {
    console.log("Error :-> ", err);
  });

  io.on("disconnection", socket => {
    console.log("Disconnected :-> ", socket.id);
  });
};
