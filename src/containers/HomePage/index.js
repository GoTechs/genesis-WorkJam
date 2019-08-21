/**
 *
 * HomePage
 */

import React from "react";
import PropTypes from "prop-types";
import Auth from "../../Services/auth";
import "./styles.sass";
import { withNamespaces } from "react-i18next";
import TicketContainer from "../TicketsContainer";
import StoriesConatiner from "../storiesConatiner";
import NavigationBar from "../../components/NavigationBar";
import { Switch, Route } from "react-router-dom";
import WalletContainer from "../WalletContainer";
import Contact from "../../components/Contact";
import PersonalDetails from "../../components/PersonalDetails";
import SideDrawer from "../../components/SideDrawer";
import Backdrop from "../../components/Backdrop/index";
import Logout from "../../components/Logout";
import withReducer from "../../store/withReducer";
import homePageReducer from "./store/reducer";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  state = {
    showSideDrawer: false,
    eventKey: 1,
    showAddWristbandModel: false
  };
  componentDidMount() {
    this.addClass();
    this.props.getAllUsers();
    this.props.getWristbandBalance();
  }

  sideDrawerToggle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  addClass = () => {
    let appClass = document.querySelector(".App");
    if (this.props.location.pathname === "/home") {
      appClass.classList.remove("login");
      appClass.classList.remove("register");
    }
  };
  handleEventKey = key => {
    this.setState({ eventKey: key });
  };

  addWristband = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showAddWristbandModel: true });
  };
  modalClose = () => {
    this.setState({ showAddWristbandModel: false });
    Auth.setVerifyWristband(false);
  };
  HandleLogout = () => {
    Auth.clearAppStorage();
    this.props.history.push("/auth/login");
  };

  render() {
    return (
      <div className="home-page">
        {/* <NavigationBar drawerToggleClicked={this.sideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          handleEventKey={this.handleEventKey}
          eventKey={this.state.eventKey}
          HandleLogout={this.HandleLogout}
        />
        <Backdrop
          show={this.state.showSideDrawer}
          clicked={this.sideDrawerClosedHandler}
        /> */}
        <div className="home-container">
          <StoriesConatiner addWristband={this.addWristband} />
        </div>
        <div />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    mainUserInfo: state.homePage.mainUserInfo,
    UsersInfo: state.homePage.UsersInfo,
    wristbandBalanceInfo: state.homePage.wristbandBalanceInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(actions.getAllUsersStart()),
    getWristbandBalance: () => dispatch(actions.getWristbandBalanceStart())
  };
};
export default withReducer("homePage", homePageReducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNamespaces("translation")(HomePage))
);
