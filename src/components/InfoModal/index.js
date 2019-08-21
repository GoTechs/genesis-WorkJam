import React from "react";
import PropTypes from "prop-types";
import { Trans, withNamespaces } from "react-i18next";
import Wristbandnumber from "../../assets/images/wristbannd-number.png";
import "./styles.sass";

const infoModal = props => {
  return (
    <div className="wristband-info-modal">
      <img
        className="wristband-info-img"
        src={Wristbandnumber}
        alt="wristband number"
      />
    </div>
  );
};

infoModal.propTypes = {};

export default withNamespaces("translation")(infoModal);
