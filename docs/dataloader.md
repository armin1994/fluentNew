---
id: dataloader
title: Dataloader
---

Server-Side Rendering — SSR from here on — is the ability of a front-end framework to render markup while running on a back-end system.

Applications that have the ability to render both on the server and on the client are called universal apps. Because of our application is an isomorphic, we need to fetch data before we send html to the client.

To fetch data, we use `Dataloader`. You have to define a static method in the container called `fetchData`. It dispatch the action on the server, get the data and store the results in to reducers and then render the full HTML with the relevant data for the client.

```js
class App extends Component {
  static fetchData(args) {
    return actions.FETCHDATA(args);
  }
}
```

```js
const Pages = [
  {
    path: "/",
    component: Home,
    exact: true
  }
];

/*** /src/utils/renderPage.js ***/
const branch = matchRoutes(Pages, req.originalUrl);
const promises = branch.map(({ match, route }) => {
  let fetchData = route.component.fetchData;
  let { params } = match;
  let { user = {} } = req;
  _.extend(params, {
    user: user
  });
  return fetchData instanceof Function
    ? store.dispatch(getData(fetchData(params), user))
    : Promise.resolve(null);
});

Promise.all(promises)
  .then(data => {
    let content = ReactDOMServer.renderToString(
      <Provider store={store}>
        <Router location={req.originalUrl} context={context}>
          <Routes initialLang={lang} pages={Pages} />
        </Router>
      </Provider>
    );
    const htmlMarkup = ReactDOMServer.renderToStaticMarkup(
      <HtmlDocument
        webpackStats={getWebpackStats(_type)}
        content={content}
        state={store.getState()}
        host={config.home}
      />
    );
    res.setHeader("content-type", "text/html");
    res.status(200).end("<!DOCTYPE html>" + htmlMarkup);
  })
  .catch(e => {
    res.send({ Error: "500" });
  });
```
