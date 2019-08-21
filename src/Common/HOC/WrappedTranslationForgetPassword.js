/**
 *
 * HOC for handling the translation forms for the forget password
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationForgetPassword = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require('../../Config/forms/forget-password/form_'+this.props.lng+'.json');
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationForgetPassword.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationForgetPassword;
