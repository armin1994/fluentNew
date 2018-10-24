import { init } from "@rematch/core";
import { routerReducer } from "react-router-redux";
import { i18nState } from "ns-redux-i18n";
import promiseMiddleware from "ff-utils/promiseMiddleware";

export default (initialState = {}, models, ...functions) => {
  const store = init({
    models,
    plugins: [promiseMiddleware],
    redux: {
      initialState: initialState,
      reducers: {
        router: routerReducer,
        i18nState
      },
      middlewares: [...functions]
    }
  });
  return store;
};
