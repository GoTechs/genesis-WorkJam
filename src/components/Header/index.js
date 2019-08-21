import React from "react";
import Logo from "../Logo";
import Language from "../Languages/Languages";
import "./styles.sass";

const header = props => {
  return (
    <div className="header">
      <Logo />
      <Language languageCliked={props.languageCliked} />
    </div>
  );
};
export default header;
