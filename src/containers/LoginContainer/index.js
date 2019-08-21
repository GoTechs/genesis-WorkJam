/**
 *
 * Login
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, map } from "lodash";
import Button from "../../components/Button/index";
import Input from "../../components/Input/index";
import wrappedTranslation from "../../Common/HOC/WrappedTranslationLogin";
import { Link } from "react-router-dom";
import Config from "../../Config/GlobalConfig.json";
import FormServices from "../../Services/formServices";
import { Trans, withNamespaces } from "react-i18next";
import * as loginActions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./styles.sass";

class Login extends Component {
  state = {
    authFormType: {},
    formData: {},
    isValidForm: false,
    hiddenPassword: true
  };

  componentDidMount() {
    this.addClass();
    this.setState(state => {
      state.authFormType = this.props.form;
      state.formData = {};
      state.isValidForm = false;
      return state;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lng !== this.props.lng) {
      this.setState(state => {
        state.authFormType = nextProps.form;
        state.formData = {};
        state.isValidForm = false;
        return state;
      });
    }
  }

  addClass = () => {
    let appClass = document.querySelector(".App");
    if (
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "/auth/login"
    ) {
      appClass.classList.remove("register");
      appClass.classList.add("login");
      appClass.style.height = "100%";
    }
  };
  showOrHidePassword = () => {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
    this.setState(st => ({
      hiddenPassword: !st.hiddenPassword
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const formData = {};
    for (let formElement in this.state.authFormType) {
      formData[formElement] = this.state.authFormType[formElement].value;
    }
    if (this.state.isValidForm) {
      this.setState({ formData: formData });
    }
    formData["Action"] = "microCheckUserLoginValidateId";
    this.props.loginClicked(formData);
  };

  renderLink = () => {
    const {
      validateWristbandLink,
      registerLink
    } = Config.components.login.show.links;
    return (
      <div className="header-link">
        {validateWristbandLink && (
          <Link to="/auth/activate-wristband">
            <Trans i18nKey="login:LOGIN_ACTIVATE_WRISTBAND">
              Activate your wristband
            </Trans>
          </Link>
        )}
        {registerLink && (
          <Link to="/auth">
            <Trans i18nKey="login:LOGIN_FIRST_TIME">
              First time here ? SIGN UP
            </Trans>
          </Link>
        )}
      </div>
    );
  };
  render() {
    let inputs = this.state.authFormType;
    let self = this;
    let redirectAfterLogin = <Redirect to="/home" />;
    return (
      <div className="login-page">
        {this.props.isLoggedIn && redirectAfterLogin}
        <div className="login-container">
          <div className="header-container">
            <h1 id="login-title">
              <Trans i18nKey="SIGN_IN_BTN">Sign In</Trans>
            </h1>
          </div>
          <div className="header-description">
            <p />
          </div>

          <div className="form-container">
            <div className="container-fluid">
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <div className="row" style={{ textAlign: "start" }}>
                  {map(inputs, (input, key) => {
                    return (
                      <Input
                        key={key}
                        elementclass={key}
                        elementType={get(input, "elementType")}
                        elementConfig={get(input, "elementConfig")}
                        placeholder={get(input, "placeholder")}
                        errorText={get(input, "errorText")}
                        value={get(input, "value")}
                        invalid={get(input, "valid")}
                        shouldValidate={get(input, "validation")}
                        touched={get(input, "touched")}
                        text={get(input, "text")}
                        checked={get(input, "checked")}
                        blur={get(input, "blur")}
                        changed={event =>
                          FormServices.inputChangedHandler(event, key, self)
                        }
                        checkValidation={() =>
                          FormServices.checkvalidityOnBlur(key, self)
                        }
                        showOrHidePassword={this.showOrHidePassword}
                        hiddenPassword={this.state.hiddenPassword}
                      />
                    );
                  })}
                  <Link to="/auth/forget-password" className="forget-password">
                    <Trans i18nKey="login:LOGIN_FORGET_PASSWORD">
                      Forgot password ?
                    </Trans>
                  </Link>

                  <div className="col-md-12 buttonContainer">
                    <Button
                      label="Submit"
                      primary
                      type="submit"
                      disabled={!this.state.isValidForm}
                    >
                      <Trans i18nKey="login:LOGIN_BTN">login</Trans>
                    </Button>
                  </div>
                  {this.renderLink()}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.defaultProps = {};
Login.propTypes = {
  loading: PropTypes.bool,
  lng: PropTypes.string,
  form: PropTypes.object
};

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    isLoggedIn: state.login.isLoggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginClicked: formData => dispatch(loginActions.loginClikced(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedTranslation(withNamespaces("login")(Login)));
