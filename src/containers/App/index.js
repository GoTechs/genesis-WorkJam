/**
 * App
 */

import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import Header from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import RouterComponent from "../RouterComponent";
import "../../assets/styles/fonts.sass";
import "./styles.sass";
import { withRouter } from "react-router-dom";
import Footer from "../../components/Footer";
import ErrorBoundary from "../../Common/HOC/ErrorBoundary";
import auth from "../../Services/auth";
import ReduxToastr from "react-redux-toastr";
import Loader from "../../components/Loading";
import CSSVariablesApplicator from "../cssVariablesApplicator";
import appReducer from "./store/reducer";
import withReducer from "../../store/withReducer";
import { connect } from "react-redux";

class App extends Component {
  state = {
    language: ""
  };

  changeLanguage = value => {
    const { i18n } = this.props;
    i18n.changeLanguage(value);
    this.setState({ language: value });
  };

  render() {
    return (
      <div className="App">
        {this.props.loading && <Loader />}
        <ErrorBoundary>
          {!auth.getUserAuth() && (
            <Header languageCliked={this.changeLanguage} />
          )}
          <CSSVariablesApplicator cssVariables={this.props.theme} />
          <ReduxToastr />
          <RouterComponent />
          <Footer />
        </ErrorBoundary>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    theme: state.app.theme
  };
};

export default withReducer("app", appReducer)(
  connect(mapStateToProps)(withRouter(withNamespaces("translation")(App)))
);
