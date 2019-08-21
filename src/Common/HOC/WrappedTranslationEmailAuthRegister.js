/**
 *
 * HOC for handling the translation forms for the registration for the auth email
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";

const wrappedTranslationRegister = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/registration/form_" +
        this.props.lng +
        ".json");
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

export default withRouter(wrappedTranslationRegister);
