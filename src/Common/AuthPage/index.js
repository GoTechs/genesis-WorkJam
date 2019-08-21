/**
 *
 * AuthPage
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, map } from "lodash";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input/index";
import FormServices from "../../Services/formServices";
import WrappedTranslation from "../../Common/HOC/WrappedTranslation";
import Config from "../../Config/GlobalConfig.json";
import "./styles.sass";
import { withNamespaces } from "react-i18next";

class AuthPage extends Component {
  state = {
    authFormType: {},
    formData: {},
    errors: [],
    didCheckErrors: false,
    loading: false,
    isValidForm: false
  };

  componentDidMount() {
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
    if (nextProps.match.params.authType !== this.props.match.params.authType) {
      this.setState(state => {
        state.authFormType = nextProps.form;
        state.formData = {};
        state.isValidForm = false;
        return state;
      });
    }
  }

  getRequestURL = () => {
    let requestURL;

    switch (this.props.match.params.authType) {
      case "login":
        requestURL = "http://localhost:1337/auth/local";
        break;
      case "register":
        requestURL = "http://localhost:1337/auth/local/register";
        break;
      case "reset-password":
        requestURL = "http://localhost:1337/auth/reset-password";
        break;
      case "forgot-password":
        requestURL = "http://localhost:1337/auth/forgot-password";
        break;
      default:
    }

    return requestURL;
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (let formElement in this.state.authFormType) {
      formData[formElement] = this.state.authFormType[formElement].value;
    }
    if (this.state.isValidForm) {
      this.setState({ formData: formData });
    }

  

  changeDateHandler = (date, inputIdentifier) => {
    const updateAuthForm = {
      ...this.state.authFormType
    };

    const updateFormElement = { ...updateAuthForm[inputIdentifier] };

    updateFormElement.value = date;

    updateFormElement.touched = true;

    updateFormElement.valid = FormServices.checkvalidity(
      updateFormElement.value,
      updateFormElement.validation
    );

    updateAuthForm[inputIdentifier] = updateFormElement;
    let formIsValid = true;

    for (let inputIdentifier in updateAuthForm) {
      formIsValid = updateAuthForm[inputIdentifier].valid && formIsValid;
    }

    this.setState(state => {
      state.authFormType = updateAuthForm;
      state.isValidForm = formIsValid;
      return state;
    });
  };
  /**
   * Check the URL's params to render the appropriate links
   * @return {Element} Returns navigation links
   */
  renderLink = () => {
    if (this.props.match.params.authType === "login") {
      return (
        <div>
          <Link to="/auth/forgot-password">Forgot Password</Link>
          &nbsp;or&nbsp;
          {Config.routes.loginWithUserCredentials.typeLogin.registerLogin && (
            <Link to="/auth">register</Link>
          )}
          {Config.routes.loginWithUserCredentials.typeLogin.wristbandLogin && (
            <Link to="/auth/activate-wristband">activate</Link>
          )}
        </div>
      );
    }

    return (
      <div>
        <Link to="/auth/login">Ready to signin</Link>
      </div>
    );
  };

  render() {
    const divStyle =
      this.props.match.params.authType === "register"
        ? { marginTop: "3.2rem" }
        : { marginTop: ".9rem" };
    let inputs = this.state.authFormType;
    let self = this;

    return (
      <div className="authPage">
        <div className="wrapper">
          <div className="headerContainer" />
          <div className="form-container" style={divStyle}>
            <div className="container-fluid">
              <form onSubmit={this.handleSubmit}>
                <div className="row" style={{ textAlign: "start" }}>
                  {map(inputs, (input, key) => {
                    return (
                      <Input
                        key={key}
                        elementType={get(input, "elementType")}
                        elementConfig={get(input, "elementConfig")}
                        placeholder={get(input, "placeholder")}
                        errorText={get(input, "errorText")}
                        value={get(input, "value")}
                        invalid={!get(input, "valid")}
                        shouldValidate={get(input, "validation")}
                        touched={get(input, "touched")}
                        text={get(input, "text")}
                        checked={get(input, "checked")}
                        changed={event =>
                          FormServices.inputChangedHandler(event, key, self)
                        }
                        changeDate={this.changeDateHandler}

                        // didCheckErrors={this.state.didCheckErrors}
                        // errors={get(
                        //   this.state.errors,
                        //   [
                        //     findIndex(this.state.errors, ["name", input.name]),
                        //     "errors"
                        //   ],
                        //   []
                        // )}
                      />
                    );
                  })}

                  <div className="col-md-12 buttonContainer">
                    <Button
                      label="Submit"
                      primary
                      type="submit"
                      disabled={!this.state.isValidForm}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="link-container">{this.renderLink()}</div> <br />{" "}
          <br />
          <div>
            <ul>
              {map(this.state.formData, (input, key) => {
                return (
                  <li key={key}>
                    {" "}
                    {key} : {input}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.defaultProps = {};
AuthPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default WrappedTranslation(withNamespaces("translation")(AuthPage));
