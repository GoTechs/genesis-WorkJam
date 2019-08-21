import React from "react";
import "./styles.sass";
import Balance from "../Balance";

const headerProfile = props => {
  return (
    <div className="header-profile">
      <div className="welcome-title">
        <h1 id="grey">{`Hi,${props.userInfo &&
          props.userInfo.infoUser.last_name} ! `}</h1>
        <br />
        <h1 id="grey">Welcome to your account </h1>
      </div>

      <p id="grey">let's get you set up to send, spend, get paid, and more</p>
      <Balance wristbandBalance={props.wristbandBalance} />
    </div>
  );
};
export default headerProfile;
