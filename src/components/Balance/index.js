import React from "react";
import PropTypes from "prop-types";
import { Trans, withNamespaces } from "react-i18next";
import "./styles.sass";

function balance(props) {
  return (
    <div className="balance">
      <h2 className="balance-title" id="grey">
        <Trans i18nKey="wallet:BALANCE_TITLE">Account Balance ></Trans>
      </h2>
      <div className="wristband-balance">
        <h2>{`$${props.wristbandBalance}`}</h2>
      </div>
    </div>
  );
}

balance.propTypes = {};

export default withNamespaces("wallet")(balance);
