import React from "react";
import GlobalConfig from "../../Config/GlobalConfig.json";
import styles from "./styles.sass";
const LogoDesk = GlobalConfig.logoUrl;

const logo = props => (
  <div className="logo">
    <img src={LogoDesk} alt="logo" />
  </div>
);

export default logo;
