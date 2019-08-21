/**
 *
 * Forget Password
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, map } from "lodash";
import Button from "../../components/Button/index";
import Input from "../../components/Input/index";
import wrappedTranslation from "../../Common/HOC/WrappedTranslationForgetPassword";
import { Link } from "react-router-dom";
import FormServices from "../../Services/formServices";
import { Trans, withNamespaces } from "react-i18next";
import { forgetPasswordClicked } from "./store/action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import WithReducer from "../../store/withReducer";
import forgetPasswordReducer from "./store/reducer";
import "./styles.sass";

class ForgetPassword extends Component {
  state = {
    authFormType: {},
    formData: {},
    isValidForm: false,
    loading: false
  };

  componentDidMount() {
    this.setState(state => {
      state.authFormType = this.props.form;
      state.formData = {};
      state.isValidForm = false;
      return state;
    });
    this.addClass();
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
    if (this.props.location.pathname === "/auth/forget-password") {
      appClass.classList.remove("login");
      appClass.classList.add("register");
      appClass.style.height = "100%";
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElement in this.state.authFormType) {
      formData[formElement] = this.state.authFormType[formElement].value;
    }
    if (this.state.isValidForm) {
      this.setState({ formData: formData });
    }
    formData.eventName = process.env.REACT_APP_EVENT_NAME;
    formData.lang = this.props.lng;
    formData.url = process.env.REACT_APP_URL;
    this.props.ForgetPasswordClicked(formData);
  };

  render() {
    let inputs = this.state.authFormType;
    let self = this;
    let redirectAfterForgetPassword = <Redirect to="/auth/login" />;
    return (
      <div className="forget-password-container">
        {this.props.isForgetPasswordSend && redirectAfterForgetPassword}
        <div className="title-forget-password">
          <h1>
            <Trans i18nKey="RESET_PASSWORD_TITLE">Reset Your Passsword</Trans>
          </h1>
        </div>
        <div className="form-container">
          <div className="container-fluid">
            <form onSubmit={this.handleSubmit} autoComplete="off">
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
                    />
                  );
                })}
                <div className="col-md-12 buttonContainer">
                  <Button
                    label="Submit"
                    primary
                    type="submit"
                    disabled={!this.state.isValidForm}
                  >
                    <Trans i18nKey="NEXT_BTN">Next</Trans>
                  </Button>
                </div>
                <Link to="/auth/login" className="back-link">
                  <Trans i18nKey="READY_SINGIN_LINK">Ready to signin</Trans>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ForgetPassword.defaultProps = {};
ForgetPassword.propTypes = {
  loading: PropTypes.bool,
  lng: PropTypes.string,
  form: PropTypes.object
};
const mapStateToProps = state => {
  return {
    loading: state.loading.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ForgetPasswordClicked: formData => dispatch(forgetPasswordClicked(formData))
  };
};
export default WithReducer("forgetPassword", forgetPasswordReducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(wrappedTranslation(withNamespaces("translation")(ForgetPassword)))
);
