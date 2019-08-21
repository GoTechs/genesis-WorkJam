/**
 *
 * HOC for handling the translation forms for barcode translation
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationActivateBarcode = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/activateBarcode/forms_" +
        this.props.lng +
        ".json");

      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationActivateBarcode.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationActivateBarcode;
