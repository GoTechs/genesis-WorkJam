/**
 *
 * HOC for handling the routing for a project type
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import Routes from "../../Config/routes.json";
import PropTypes from "prop-types";
import Config from "../../Config/GlobalConfig.json";

const wrappedRouter = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let routes = [];
      const { workJim } = Config.routes;

      if (workJim) {
        routes = Routes.routes.workJim;
      }

      return <WrappedComponent routes={routes} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedRouter.PropTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedRouter;
