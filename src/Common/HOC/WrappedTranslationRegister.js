/**
 *
 * HOC for handling the translation forms for the register
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const wrappedTranslationRegister = WrappedComponent => {
  class Hoc extends Component {
    render() {
      const _form = require("../../Config/forms/registration/form_" +
        this.props.lng +
        ".json");
      const _formEdit = require("../../Config/forms/edit/form_" +
        this.props.lng +
        ".json");
      let form = {};
      if (this.props.location.pathname === "/home/personal-details") {
        form = _formEdit.views;
      } else {
        form = _form.views;
      }

      return <WrappedComponent form={form} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

wrappedTranslationRegister.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default wrappedTranslationRegister;
