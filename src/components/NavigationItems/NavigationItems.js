import React from "react";
import { Trans, withNamespaces } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./styles.sass";
import Icon from "../../components/Icons";

const navigationItems = props => {
  const title = props.mainUserInfo;
  return (
    <Nav
      className="NavigationItems"
      defaultActiveKey={props.eventKey}
      onSelect={key => props.handleEventKey(key)}
    >
      <div className="top-side-drawer">
        <Nav.Link as={NavLink} to="/home/personal-details" eventKey={4.1}>
          <Icon name="profile-side" />
          <div className="profile-side-bar">
            {title && title.first_name} {title && title.last_name}
          </div>
        </Nav.Link>
      </div>
      <div className="content-side-drawer">
        <Nav.Link as={NavLink} to="/home/my-tickets" eventKey={1}>
          <Icon name="ticket-side" />
          <Trans i18nKey="MY_TICKET_LINK">My Tickets</Trans>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/home/wallet" eventKey={2}>
          <Icon name="wallet-side" />
          <Trans i18nKey="WALLET_LINK">Wallet</Trans>
        </Nav.Link>
      </div>
      <div className="bottom-side-drawer">
        <Nav.Link as={NavLink} to="/home/contact-support" eventKey={4.2}>
          <Icon name="contact-side" />
          <Trans i18nKey="CONTACT_SUPPORT_LINK">Contact support</Trans>
        </Nav.Link>
        <Nav.Link onClick={props.HandleLogout}>
          <Icon name="logout-side" />
          <Trans i18nKey="LOGOUT_LINK">logout</Trans>
        </Nav.Link>
      </div>
    </Nav>
  );
};

export default withNamespaces("translation")(navigationItems);
