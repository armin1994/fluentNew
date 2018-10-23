---
id: routes
title: Routes
---

For routing, we are using react-router. React Router will be the source of truth for your URL.

In a React app, usually you would wrap <Route /> in <Router /> so that when the URL changes, <Router /> will match a branch of its routes, and render their configured components. <Route /> is used to declaratively map routes to your application's component hierarchy. You would declare in path the path used in the URL and in component the single component to be rendered when the route matches the URL.

```js
const Root = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
);
```

However, in our Redux App we will still need <Provider />. <Provider /> is the higher-order component provided by React Redux that lets you bind Redux to React

We will then import the <Provider /> from React Redux:

```js
import { Provider } from "react-redux";
```

We will wrap <Router /> in <Provider /> so that route handlers can get access to the store.

```js
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```

In our application, we are using route config.

```js
import { renderRoutes } from "react-router-config";
const routes = [
  {
    component: require("./App"),
    path: "/",
    exact: true
  }
];
renderRoutes(routes);
```

For nested routes

```js
const routes = [
  {
    component: require("./Container"),
    routes: [
      {
        component: require("./App"),
        path: "/",
        exact: true
      }
    ]
  }
];
```
