---
id: rematch
title: Rematch
---

## Rethink Redux.

Rematch is Redux best practices without the boilerplate. No more action types, action creators, switch statements or thunks.

## Getting Started

The latest version of rematch and rematch plugins can be installed with the `@next` flag.

```sh
npm install @rematch/core@next
```

### Step 1: Init

**init** configures your reducers, devtools & store.

#### index.js

```js
import { init } from '@rematch/core'
import * as models from './models'

const store = init({
  models,
})

export default store
```

### Step 2: Models

The **model** brings together state, reducers, async actions & action creators in one place.

#### models.js
```js
export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    }
  })
}
```

*See the [reducers docs](https://github.com/rematch/rematch/blob/master/docs/api.md#reducers) to learn more, including how to trigger actions from other models.*

Understanding models is as simple as answering a few questions:

1. What is my initial state? **state**
2. How do I change the state? **reducers**
3. How do I handle async actions? **effects** with async/await

### Step 3: Dispatch

**dispatch** is how we trigger reducers & effects in your models. Dispatch standardizes your actions without the need for writing action types or action creators.

```js
import { init } from '@rematch/core'
import * as models from './models'

const store = init({
  models,
})

export const { dispatch } = store
                                                  // state = { count: 0 }
// reducers
dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
dispatch.count.increment(1)                       // state = { count: 2 }

// effects
dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
dispatch.count.incrementAsync(1)                       // state = { count: 4 } after delay
```

Dispatch can be called directly, or with the `dispatch[model][action](payload)` shorthand.


### Step 4: View

Rematch can be used with native redux integrations such as "react-redux". See an example below.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './index'

const Count = props => (
  <div>
    The count is {props.count}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

const mapState = state => ({
  count: state.count
})

const mapDispatch = ({ count: { increment, incrementAsync }}) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1)
})

const CountContainer = connect(mapState, mapDispatch)(Count)

ReactDOM.render(
  <Provider store={store}>
    <CountContainer />
  </Provider>,
  document.getElementById('root')
)
```