import { init } from "@rematch/core";
import Raven from "raven-js";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { routerReducer } from "react-router-redux";
import { i18nState } from "ns-redux-i18n";
import { createCookieMiddleware } from "redux-cookie";
import Cookie from "js-cookie";
import createRavenMiddleware from "ff-utils/ravenMiddleware";
import createHistory from "history/createBrowserHistory";
import promiseMiddleware from "ff-utils/promiseMiddleware";
import { routerMiddleware } from "react-router-redux";
const initialState = typeof window !== "undefined" && window.__INITIAL_STATE__;


let options = {
  basename: "/-/d"
};

const configureStore = models => {
  /**
   * Intall RavenJS if in production configuration
   */
  if (process.env.NODE_ENV != "development") {
    const RAVEN_DSN = "";
    Raven.config(RAVEN_DSN).install();
  }
  /**
   * Configure reducers
   */
  const reducers = {
    i18nState,
    router: routerReducer
  };

  /**
   * Create middleware
   */
  const history = createHistory(options);
  const middlewares = [
    routerMiddleware(history),
    createCookieMiddleware(Cookie),
    createRavenMiddleware(Raven, {
      breadcrumbDataFromAction: action => {
        return { RESPONSE: action.response };
      }
    })
  ];

  /**
   * Initialize store using rematch and redux
   */
  const store = init({
    models,
    plugins: [promiseMiddleware],
    redux: {
      initialState: initialState,
      reducers: reducers,
      middlewares: [...middlewares],
      devtoolOptions: composeWithDevTools({})
    }
  });
  return { store, history };
};

export default configureStore;
