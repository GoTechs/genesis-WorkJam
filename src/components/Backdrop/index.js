import React from "react";
import "./styles.sass";

const backdrop = props =>
  props.show ? <div className="Backdrop" onClick={props.clicked} /> : null;

export default backdrop;
