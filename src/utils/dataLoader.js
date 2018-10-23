import React, { Component } from "react";
import { object } from "prop-types";
import { withRouter } from "react-router-dom";
import { matchRoutes, renderRoutes } from "react-router-config";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

export const fetchData = (routes, store, location) => {
  const branch = matchRoutes(routes, location);
  const promises = branch.map(({ route, match }) => {
    if (route.component.fetchData) {
      return route.component.fetchData(store, match);
    }
  });
  return Promise.all(promises);
};

class DataLoader extends Component {
  static displayName = "DataLoader";

  static contextTypes = {
    store: object
  };

  static propTypes = {
    location: object.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    const navigated = prevProps.location !== this.props.location;
    if (navigated) {
      console.log(this.props);
      const { routes } = this.props;
      const { store } = this.context;
      fetchData(routes, store, this.props.location.pathname);
    }
  }
  render() {
    const { routes } = this.props;
    return (
      <LocaleProvider locale={enUS}>{renderRoutes(routes)}</LocaleProvider>
    );
  }
}

export default withRouter(DataLoader);
