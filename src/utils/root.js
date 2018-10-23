import { Component } from "react";
import { translations } from "../locale/index";
import { I18n } from "ns-redux-i18n";

export default class Root extends Component {
  render() {
    return (
      <I18n translations={translations}>
        <div>
          {children}
        </div>
      </I18n>
    );
  }
}