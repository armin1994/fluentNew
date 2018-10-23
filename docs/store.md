---
id: store
title: Store
---

In Redux application, `Store` is single source of truth to get the information in constant time. It means that the state of your whole application is stored in an object tree within a single `store`.

This makes it easy to create universal apps, as the state from your server can be serialized and hydrated into the client with no extra coding effort. A single state tree also makes it easier to debug or inspect an application; it also enables you to persist your app's state in development, for a faster development cycle. Some functionality which has been traditionally difficult to implement - Undo/Redo, for example - can suddenly become trivial to implement, if all of your state is stored in a single tree.

Because we are using `Rematch` instead of `Redux`, syntaxt of creating a store is little different.

Here you can find a simple example to create a store.

```js
import { init } from "@rematch/core";
import * as models from "./models";

const store = init({
  models
});

export default store;
```

Our Application is an isomorphic. Because of that we have to create a store for client as well as server with different configuration options. If you already have `Redux` setup and want to create a store using `Rematch`, see below section.


## Redux

This section provides access to your Redux setup, along with options to overwrite Redux methods.

### initialState

```js
init({
  redux: {
    initialState: any
  }
 })
```

The initialState of your app. This is likely not necessary, as the state of your models will overwrite the initial state.

### reducers

```js
const someReducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}

init({
  redux: {
    reducers: {
      someReducer,
    }
  }
})
```

Allows passing in of reducer functions, rather than models. While not recommended, this can be used for migrating a Redux codebase or configuring different Redux extensions.

### middlewares

```js
init({
  redux: {
    middlewares: [customMiddleware()]
  }
})
```

Add middleware to your store.

### enhancers

```js
init({
  redux: {
    enhancers: [customEnhancer()]
  }
})
```

Add enhancers to your store.

### rootReducers

```js
init({
  redux: {
    rootReducers: {
      'RESET': (state, action) => undefined,
    }
  }
})
```

A way to setup middleware hooks at the base of your root reducer. Unlike middleware, the return value is the next state. If `undefined`, the state will fallback to the initial state of reducers.

### combineReducers

```js
init({
  redux: {
    combineReducers: customCombineReducers
  }
})
```

Allows access to overwrite Redux's `combineReducers` method. Currently necessary for setting up Redux persist v5.


### createStore

```js
init({
  redux: {
    createStore: customCreateStore
  }
})
```

Allows access to overwrite Redux's `createStore` method. Currently necessary for setting up Reactotron with Redux.

### devtoolOptions

```js
init({
  redux: {
    devtoolOptions: customDevtoolOptions
  }
})
```

