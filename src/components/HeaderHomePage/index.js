import React from "react";
import Logo from "../Logo";
import Language from "../Languages/Languages";
import "./styles.sass";

const headerHomePage = props => {
  return (
    <div className="header-home-page">
      <Logo />
      <Language languageCliked={props.languageCliked} />
    </div>
  );
};
export default headerHomePage;
