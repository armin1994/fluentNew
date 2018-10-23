import { createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import { init } from "@rematch/core";
import models from "ff-shared/admin/models";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { i18nState } from "ns-redux-i18n";
import thunk from "redux-thunk";
import promiseMiddleware from "ff-utils/promiseMiddleware";

export default (initialState = {}, ...functions) => {
  const store = init({
    models,
    plugins: [promiseMiddleware],
    redux: {
      initialState: initialState,
      reducers: {
        router: routerReducer,
        i18nState
      },
      middlewares: [thunk, ...functions]
    }
  });
  return store;
};
