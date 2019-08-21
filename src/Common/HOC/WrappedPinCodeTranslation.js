/**
 *
 * HOC for handling the translation forms for adding Pin Code
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedPinCodeTranslation = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/AddPinCode/forms_" +
        this.props.lng +
        ".json");

      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedPinCodeTranslation.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedPinCodeTranslation;
