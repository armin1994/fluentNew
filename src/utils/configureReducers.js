import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";
import { i18nState } from "ns-redux-i18n";
import handleNavOpenKeys from "../redux/Admin/handleNavOpenKeys";
import session from "../redux/Admin/session";

const configureReducers = (reducers) => {
  return combineReducers({
    ...reducers,
    router: routerReducer,
    i18nState,
    handleNavOpenKeys,
    session,
    form,
    modal
  });
};

export default configureReducers;