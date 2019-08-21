import React from "react";
import Logo from "../Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawerToggle";

const toolBar = props => {
  return (
    <header className="Toolbar">
      <DrawerToggle drawerToggleClicked={props.drawerToggleClicked} />
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </header>
  );
};
export default toolBar;
