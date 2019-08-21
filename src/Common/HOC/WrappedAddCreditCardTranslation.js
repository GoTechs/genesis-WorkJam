/**
 *
 * HOC for handling the translation forms for adding Credit Card
 *
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";

const WrappedAddCreditCard = WrappedComponent => {
  class Hoc extends Component {
    render() {
      let form = require("../../Config/forms/AddCreditCard/forms_" +
        this.props.lng +
        ".json");

      return <WrappedComponent form={form.views} {...this.props} />;
    }
  }
  return withNamespaces("translation")(Hoc);
};

WrappedAddCreditCard.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default WrappedAddCreditCard;
