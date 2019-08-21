/**
 *
 * HOC for handling the translation forms for the email translation
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationEmailAuth = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require('../../Config/forms/check-email/form_'+this.props.lng+'.json');
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationEmailAuth.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationEmailAuth;
