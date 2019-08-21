/**
 *
 * HOC for handling the translation forms for the login with username and password
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationLogin = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/login/form_" +
        this.props.lng +
        ".json");
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationLogin.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationLogin;
