import { matchRoutes } from "react-router-config";
import callAction from "ff-server/moleculer";
import { createRoutes } from "./createRoutes";
import _ from "lodash";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

export const getData = (action, user) => {
  const [SERVER, ActionType = action] = action.type.split("/");
  const payload = _.extend(action.payload, {
    auth: { user: user }
  });
  return {
    type: ActionType,
    promise: callAction(ActionType, payload)
  };
};


export default getData;
