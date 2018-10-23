---
id: socket
title: Socket
---

Communication between browser and frontend-server happens using socket connection.

We are using primus for two different things. First is to communicate between browser and frontend server and another is for streaming.

## Primus

Primus, the creator god of transformers but now also known as universal wrapper for real-time frameworks. There are a lot of real-time frameworks available for Node.js and they all have different opinions on how real-time should be done. Primus provides a common low level interface to communicate in real-time using various real-time frameworks.

### Parser

In addition to support different frameworks Primus also made it possible to use custom encoding and decoding libraries. We're using JSON by default but you could also use binary or EJSON for example (but these parsers need to be supported by Primus, so check out the parser folder for examples). To specify the parser to use you can supply a parser configuration option:

```js
var primus = new Primus(server, { parser: "JSON" });
```

All parsers have an async interface for error handling.

### Plugins

Primus was built as a low level interface where you can build your applications upon. At it's core, it's nothing more than something that passes messages back and forth between the client and server.

Plugins are added on the server side in the form of an Object:

```js
//
// Require a plugin directly.
//
primus.plugin("name", require("metroplex"));

//
// Or supply it manually with the required object structure
//
primus.plugin("name", {
  server: function(primus, options) {},
  client: function(primus, options) {},
  library: "client side library"
});
```

### Example

Here we are using `microwebsocket (uws)` as a transformer and `binarypack` as a parser. You can choose any transformer you want including `engine.io`, `sock.js`, `faye` or pure websocket. But it has to be compitable with binary parser.

```js
// Defined Primus with microwebsocket as a transformer and binarypack as a parser

/** /src/server/server.js **/
const io = new Primus(httpServer, {
  transformer: "uws",
  parser: binaryPack
});

// Share session
io.use("session", (req, res, next) => {
  sessionM(req, {}, next);
});

// Share passportJS Object
io.use("passport", (req, res, next) => {
  PassportM(req, {}, next);
});

// Defined Plugins
io.plugin("multiplex", Multiplex)
  .plugin("emitter", Emitter)
  .plugin("substream", Substream);

// Save primus client library
io.save(__dirname + "/../../public/js/primus.js");

/*
* Now is to transfer request to the backend.
* Here we are parsing each requests come from browser.
*
*/

/** src/server/io/index.js **/
io.on("connection", socket => {
  /**
   * General API Calls
   */
  socket.on("action", action => {
    const parseA = new parseAction(action);
    if (parseA.isServer()) {
      const ActionCall = loadAction(parseA.getAction(), "Web");
      ActionCall(socket, action);
    } else if (parseA.isApp()) {
      const ActionCall = loadAction(parseA.getAction(), "App");
      ActionCall(socket, action);
    }
  });
});

/**
 * RPC CALL
 * @param {Object} socket - socket instance object
 * @param {Object} action - action with type and payload json object
 */

/* /src/server/io/controllers/dashboard_io.js */
export const ACTION_NAME = (socket, action) => {
  // Check if user is authorized before sending any request to the backend
  isAuthorized(["SuperAdmin", "Admin"], socket, action, payload => {
    ActionRPC(socket, action, payload);
  });

  /** or  **/

  // Without any authorization
  ActionRPC(socket, action, action.payload);
};
```
