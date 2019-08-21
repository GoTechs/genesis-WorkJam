/**
 *
 * HOC for handling the translation forms
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslation = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require('../../Config/forms/authentification/form_'+this.props.lng+'.json');
      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslation.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslation;
