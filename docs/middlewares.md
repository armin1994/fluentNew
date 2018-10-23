---
id: middlewares
title: Middlewares
---


If you've used server-side libraries like Express and Koa, you were also probably already familiar with the concept of middleware. In these frameworks, middleware is some code you can put between the framework receiving a request, and the framework generating a response. For example, Express or Koa middleware may add CORS headers, logging, compression, and more. The best feature of middleware is that it's composable in a chain. You can use multiple independent third-party middleware in a single project.

Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way. It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

Add middleware to your store using `Rematch`

```js
init({
  redux: {
    middlewares: [customMiddleware()]
  }
})
```



