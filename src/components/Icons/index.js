import React from "react";
import Information from "./information";
import Wristband from "./wristband";
import MasterCard from "./masterCard";
import Visa from "./visa";
import Delete from "./delete";
import ArrowStory from "./arrowHistory";
import LimitSubmit from "./limit-submit";
import Arrow from "./arrow";
import Print from "./print";
import ArrowDown from "./arrowDown";
import Profile from "./profile";
import ProfileSide from "./profileSide";
import LogoutSide from "./logoutSide";
import WalletSide from "./walletSide";
import TicketSide from "./ticketSide";
import ContactSide from "./contactSide";
import TicketHistory from "./ticketHistory";

const icon = props => {
  switch (props.name) {
    case "information":
      return <Information {...props} />;
    case "wristband":
      return <Wristband {...props} />;
    case "master-card":
      return <MasterCard {...props} />;
    case "visa":
      return <Visa {...props} />;
    case "delete":
      return <Delete {...props} />;
    case "arrow-hitory":
      return <ArrowStory {...props} />;
    case "limit-submit":
      return <LimitSubmit {...props} />;
    case "arrow":
      return <Arrow {...props} />;
    case "print":
      return <Print {...props} />;
    case "arrow-down":
      return <ArrowDown {...props} />;
    case "profile":
      return <Profile {...props} />;
    case "profile-side":
      return <ProfileSide {...props} />;
    case "logout-side":
      return <LogoutSide {...props} />;
    case "wallet-side":
      return <WalletSide {...props} />;
    case "ticket-side":
      return <TicketSide {...props} />;
    case "contact-side":
      return <ContactSide {...props} />;
    case "ticket-historic":
      return <TicketHistory {...props} />;

    default:
      return <div />;
  }
};

export default icon;
