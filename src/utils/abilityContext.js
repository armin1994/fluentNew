import React, { Component } from "react";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import _ from "lodash";
import { Ability } from "@casl/ability";
import jwt from "jsonwebtoken";
import publicKey from "./publicKey";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export class AbilityConsumer extends Component {
  render() {
    return (
      <AbilityContext.Consumer>{this.props.children}</AbilityContext.Consumer>
    );
  }
}

export const getAbilities = (session = {}) => {
  const { user = {} } = session;
  if (!_.isEmpty(user)) {
    const { can = {} } = user;
    if (!_.isEmpty(can)) {
      return jwt.verify(can, publicKey, (err, token) => {
        if (err) return new Ability([]);
        const { rules = new Ability([]) } = token;
        return new Ability(rules);
      });
    } else {
      return new Ability([]);
    }
  } else {
    return new Ability([]);
  }
};
