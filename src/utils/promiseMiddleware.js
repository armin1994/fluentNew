import axios from "axios";
import typeParser from "ff-utils/parseType";
import config from "ff-utils/apiConfig";

const plugin = {
  middleware: store => next => action => {
    const { promise, type } = action;
    const parseType = new typeParser(type);
    const model = parseType.getModel();
    const effect = parseType.getEffects();
    /**
     * If promise not found return next action
     */
    if (!promise) return next(action);

    const REQUEST = `SERVER/${type}`;
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAIL`;
    const MYRESPONSE = `${model}/serverUpdate`;

    /**
     * Next action
     */
    next({ type: REQUEST });

    const { payload = {}, headers = {} } = promise;

    return axios({
      method: "POST",
      url: confgi.api.url,
      data: payload,
      headers: headers
    })
      .then(({ result: response }) => {
        next({ response, type: SUCCESS });
        return true;
      })
      .catch(error => {
        next({ payload: { type: FAILURE }, type: MYRESPONSE });
        return false;
      });
  }
};

export default plugin;
