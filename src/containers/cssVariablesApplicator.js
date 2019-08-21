import React, { Component } from "react";
import PropTypes from "prop-types";
import { forEach } from "lodash";

class cssVariablesApplicator extends Component {
  componentDidMount() {
    this.updateCSSVariables(this.props.cssVariables);
  }
  componentDidUpdate(prevProps) {
    if (this.props.cssVariables !== prevProps.cssVariables) {
      this.updateCSSVariables(this.props.cssVariables);
    }
  }

  updateCSSVariables = variables => {
    forEach(variables, (value, prop) => {
      document.documentElement.style.setProperty(prop, value);
    });
  };

  render() {
    return <div> {this.props.children} </div>;
  }
}

export default cssVariablesApplicator;
