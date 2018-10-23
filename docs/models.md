---
id: models
title: Models
---

The model brings together state, reducers, async actions & action creators in one place.

Understanding models is as simple as answering a few questions:

1. What is my initial state? **state**
2. How do I change the state? **reducers**
3. How do I handle async actions? **effects** with async/await

`init({ models: { [string]: model } })`

```js
import { init } from '@rematch/core'

const count = {
  state: 0,
}

init({
  models: {
    count
  }
})
```

For smaller projects, its recommend you keep your models in a "models.js" file and named export them.

```js
export const count = {
  state: 0,
}
```

For larger projects, its recommended you keep your models in a "models" folder and export them.

```js
// models/count.js
export default {
  state: 0,
}
```

```js
// models/index.js
export { default as count } from './count'
export { default as settings } from './settings'
```

These can then be imported using `* as alias` syntax.

```js
import { init } from '@rematch/core'
import * as models from './models'

init({ models })
```

## state

`state: any` Required

The initial state of the model.

```js
const example = {
  state: { loading: false }
}
```

## reducers

`reducers: { [string]: (state, payload) => any }`

An object of functions that change the model's state. These functions take the model's previous state and a payload, and return the model's next state. These should be pure functions relying only on the state and payload args to compute the next state. For code that relies on the "outside world" (impure functions like api calls, etc.), use [effects](#effects).

```js
{
  reducers: {
    add: (state, payload) => state + payload,
  }
}
```

Reducers may also listen to actions from other models by listing the 'model name' + 'action name' as the key.

```js
{
  reducers: {
    'otherModel/actionName': (state, payload) => state + payload,
  }
}
```

## effects

`effects: { [string]: (payload, rootState) }`

An object of functions that can handle the world outside of the model.

```js
{
  effects: {
    logState(payload, rootState) {
      console.log(rootState)
    }
  }
}
```

Effects provide a simple way of handling async actions when used with `async/await`.

```js
{
  effects: {
    async loadData(payload, rootState) {
      // wait for data to load
      const response = await fetch('http://example.com/data')
      const data = await response.json()
      // pass the result to a local reducer
      dispatch.example.update(data)
    }
  }
}
```


## baseReducer

`baseReducer: (state, action) => state`

A reducer that will run before the model's `reducers`. This function takes the model's previous state and an action, and returns the model state that `reducers` will use.

