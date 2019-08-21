/**
 *
 * HOC for handling the translation for the reset password forms
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationResetPassword = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/reset-password/form_" +
        this.props.lng +
        ".json");
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationResetPassword.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationResetPassword;
