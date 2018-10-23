---
id: rpc
title: RPC
---

We are using Jayson to connect to the backend. Jayson is a simple but featureful JSON-RPC 2.0/1.0 client and server for node.js

Simple client example.

```js
var jayson = require("jayson");

// create a client
var client = jayson.client.http({
  port: 3000
});

// invoke "add"
client.request("add", [1, 1], function(err, response) {
  if (err) throw err;
  console.log(response.result); // 2
});
```

Jayson can be use with Promises as well. In this application, we are using Promises. We created a simple function to call RPC server.

`/src/server/RPC/jsonRPC.js`
```js
export default (Action, Payload = [], callback = [], error = []) => {
  const reqs = [Client.request(Action, Payload)];
  Promise.all(reqs).then(
    res => {
      callback(res);
    },
    err => {
      error(err);
    }
  );
};
```
## Options
- `Action` name of the function you want to call
- `Payload` payload data
- `callback` callback function. It is equivalent to `.then`
- `error` error function. It is equivalent to `.catch`
