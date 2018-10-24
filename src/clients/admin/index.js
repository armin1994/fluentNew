import("@babel/polyfill");
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { Router } from "react-router";
import Routes from "ff-utils/renderRoutes";
import Pages from "./routes";
import configureStore from "./store/configureStore";
import Cookie from "js-cookie";
import models from "./models";
/**
 * Import main .less file
 */
import "../../themes/index.less";

const RootElement = document.getElementById("root");
const lang = Cookie.get("lang") || "en_US";

/**
 * Configure Store
 */
const { store, history } = configureStore(models);
/**
 * Render Client Routes
 */
const render = (Routes, Pages) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Routes initialLang={lang} pages={Pages} />
        </Router>
      </Provider>
    </AppContainer>,
    RootElement
  );
};
render(Routes, Pages);
