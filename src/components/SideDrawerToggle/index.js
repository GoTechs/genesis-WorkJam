import React from "react";
import "./styles.sass";
import IconMenu from "../../assets/images/Icone-Menu.png";

const drawerToggle = props => (
  <div className="DrawerToggle" onClick={props.drawerToggleClicked}>
    <img src={IconMenu} alt="icon-menu" />
  </div>
);

export default drawerToggle;
