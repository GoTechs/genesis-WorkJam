import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Trans, withNamespaces } from "react-i18next";
import Logo from "../Logo";
import Auth from "../../Services/auth";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Language from "../Languages/Languages";
import DrawerToggle from "../SideDrawerToggle";
import Icon from "../Icons";
import "./styles.sass";
import Config from "../../Config/GlobalConfig.json";

class NavigationBar extends Component {
  state = {
    eventKey: 1
  };
  handleEventKey = key => {
    this.setState({ eventKey: key });
  };
  HandleChangeCliked = lg => {
    const { i18n } = this.props;
    i18n.changeLanguage(lg);
  };

  render() {
    const { HorizontalSideDrawer, VerticalSideDrawer } = Config.layout.show;
    const title = this.props.mainUserInfo;
    const {
      ticket,
      wallet,
      loyaltyProgram,
      perosnalDetails,
      contactSupport
    } = Config.components.header.show.links;
    return (
      <div className="navigation-bar">
        <Navbar expand="sm" sticky="top">
          {VerticalSideDrawer && (
            <DrawerToggle
              drawerToggleClicked={this.props.drawerToggleClicked}
            />
          )}
          <Navbar.Brand href="/home" className="brand">
            <Logo />
          </Navbar.Brand>

          {HorizontalSideDrawer && <Navbar.Toggle />}
          <Navbar.Collapse id="navbar-nav" className="top-nav-bar">
            <Nav onSelect={key => this.handleEventKey(key)}>
              {ticket && (
                <Nav.Link as={NavLink} to="/home/my-tickets" eventKey={1}>
                  <Trans i18nKey="HEADER_MY_TICKETS_LINK">My Tickets</Trans>
                </Nav.Link>
              )}
              {wallet && (
                <Nav.Link as={NavLink} to="/home/wallet" eventKey={2}>
                  <Trans i18nKey="HEADER_WALLET_LINK">Wallet</Trans>
                </Nav.Link>
              )}
              {loyaltyProgram && (
                <Nav.Link as={NavLink} to="/home/loyalty-program" eventKey={3}>
                  <Trans i18nKey="HEADER_LOYALTY_PROGRAM_LINK">
                    Loyalty program
                  </Trans>
                </Nav.Link>
              )}
              <Icon name="profile" />
              <NavDropdown id="nav-dropdown">
                {perosnalDetails && (
                  <NavDropdown.Item
                    as={NavLink}
                    to="/home/personal-details"
                    eventKey={4.1}
                  >
                    <Trans i18nKey="HEADER_PERSONAL_DETAILS_LINK">
                      Personal details
                    </Trans>
                  </NavDropdown.Item>
                )}
                {contactSupport && (
                  <NavDropdown.Item
                    as={NavLink}
                    to="/home/contact-support"
                    eventKey={4.2}
                  >
                    <Trans i18nKey="HEADER_CONTACT_SUPPORT_LINK">
                      contact support
                    </Trans>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    Auth.clearAppStorage();
                    this.props.history.push("/auth/login");
                  }}
                >
                  <Trans i18nKey="LOGOUT_BTN">logout</Trans>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Language languageCliked={this.HandleChangeCliked} />
        </Navbar>
      </div>
    );
  }
}

export default withRouter(withNamespaces("translation")(NavigationBar));
