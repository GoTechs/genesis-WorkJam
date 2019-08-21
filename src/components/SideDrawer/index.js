import React from "react";
import Fragment from "../../Common/HOC/Fragement";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = props => {
  let sideDrawerState = ["SideDrawer", "Close"];
  if (props.open) {
    sideDrawerState = ["SideDrawer", "Open"];
  }

  return (
    <Fragment>
      <div className={sideDrawerState.join(" ")} onClick={props.closed}>
        <nav>
          <NavigationItems
            showdropDown={props.showdropDown}
            handleEventKey={props.handleEventKey}
            eventKey={props.eventKey}
            HandleLogout={props.HandleLogout}
            mainUserInfo={props.mainUserInfo}
          />
        </nav>
      </div>
    </Fragment>
  );
};
export default sideDrawer;
