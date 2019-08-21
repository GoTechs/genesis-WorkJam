/**
 * HOC to handle the error for the child
 */

import React, { Component } from "react";
// import Fragement from "./Fragement";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Trans } from "react-i18next";

class ErrorBoundary extends Component {
  state = {
    error: false,
    errorInfo: null,
    hasError: false
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo, hasError: true });
  }
  render() {
    if (this.state.hasError) {
      toast.success(<Trans i18nKey="" />);
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
