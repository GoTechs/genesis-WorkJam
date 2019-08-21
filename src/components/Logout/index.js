import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = state => {
  return {
    logout: state.logout
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Logout);
