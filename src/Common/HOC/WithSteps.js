/**
 *
 * HOC for handling the routing for a project type
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import Flows from "../../Config/flows.json";
import PropTypes from "prop-types";
import Config from "../../Config/GlobalConfig.json";

const WithSteps = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let steps = [];
      const { flow1, flow2 } = Config.flows;

      if (flow1) {
        steps = Flows.flows.flow1.steps;
      }
      if (flow2) {
        steps = Flows.flows.flow2.steps;
      }

      return <WrappedComponent steps={steps} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

WithSteps.PropTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default WithSteps;
