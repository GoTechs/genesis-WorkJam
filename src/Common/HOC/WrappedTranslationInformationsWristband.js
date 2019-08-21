/**
 *
 * HOC for handling the translation forms for wristband activation
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationInformationWristband = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/InformationTicket/form_" +
        this.props.lng +
        ".json");

      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationInformationWristband.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationInformationWristband;
