import React from "react";
import PropTypes from "prop-types";
import { Trans, withNamespaces } from "react-i18next";
import "./styles.sass";

const headerCreditCard = props => {
  return (
    <div className="header-wallet">
      <p id="grey">
        <Trans i18nKey="wallet:WALLET_DESCRIPTION">
          Please add the credit card(s) you want to use to make purchases. On
          this page, you also have the opportunity to set the limit per person
          in your account.
        </Trans>
      </p>
    </div>
  );
};

headerCreditCard.propTypes = {};

export default withNamespaces("wallet")(headerCreditCard);
