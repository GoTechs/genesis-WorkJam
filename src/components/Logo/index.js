import React from "react";
import GlobalConfig from "../../Config/GlobalConfig.json";
import styles from "./styles.sass";
import WorkJamLogo from "../../assets/images/WorkJam-Blog-Logo.png";

const logo = props => (
  <div className="logo">
    <img src={WorkJamLogo} alt="logo" />
  </div>
);

export default logo;
