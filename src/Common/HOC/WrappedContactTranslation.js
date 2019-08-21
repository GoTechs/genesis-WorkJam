/**
 *
 * HOC for handling the translation forms for contact support
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedContactTranslation = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/contact/form_" +
        this.props.lng +
        ".json");

      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedContactTranslation.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedContactTranslation;
