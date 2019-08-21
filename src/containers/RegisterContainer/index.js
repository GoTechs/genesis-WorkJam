/**
 *
 * Register Page that allowed the user to create or update the order
 *
 */
import React, { Component } from "react";
import WrappedTranslationRegister from "../../Common/HOC/WrappedTranslationRegister";
import ActivateWristbandContainer from "../activateWristbandContainer";
import { get, map, pickBy } from "lodash";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Auth from "../../Services/auth";
import { Trans, withNamespaces } from "react-i18next";
import Api from "../../Services/api";
import FormServices from "../../Services/formServices";
import dataServices from "../../Services/dataServices";
import Config from "../../Config/GlobalConfig.json";
import { withRouter } from "react-router-dom";
import Ticket from "../../components/Ticket";
import withReducer from "../../store/withReducer";
import registerReducer from "./store/reducer";
import { connect } from "react-redux";
import {
  createProfileClicked,
  updateProfileClicked,
  createOrderClicked,
  updateOrderClicked
} from "./store/action";
import { Redirect } from "react-router-dom";
import "./styles.sass";

class Register extends Component {
  state = {
    authFormType: {},
    formData: {},
    loading: false,
    isValidForm: false,
    userInfo: {},
    ticketInfo: {},
    showWristbandInfo: false,
    email: "",
    date: {
      day: null,
      month: null,
      year: null
    }
  };

  componentDidMount() {
    if (this.props.location.pathname === "/home/personal-details") {
      this.setState({ loading: true, showWristbandInfo: true });
      let userId = Auth.getUserId();
      Api.apiCall({ user_id: userId }, "getProfileInfo").then(userInfo => {
        let updateForm = this.props.form;
        if (userInfo.birthday) {
          const newDate = dataServices.formatEditDate(userInfo.birthday);
          userInfo["year"] = newDate[0];
          userInfo["month"] = newDate[1] - 1;
          userInfo["day"] = newDate[2];
        }

        let updatedUserInfo = dataServices.updateUserInfo(updateForm, userInfo);
        this.setState({
          authFormType: updatedUserInfo,
          isValidForm: true,
          userInfo: userInfo,
          date: {
            day: userInfo["day"],
            month: userInfo["month"] + 1,
            year: userInfo["year"]
          }
        });
      });
    } else {
      let form = pickBy(this.props.form, item => item.show);
      this.addClass();
      this.setState(state => {
        state.authFormType = form;
        state.formData = {};
        state.isValidForm = false;
        return state;
      });
    }
    this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    if (nextProps.lng !== this.props.lng) {
      if (this.props.location.pathname === "/home/personal-details") {
        let userInfo = this.state.userInfo;
        let updateForm = this.props.form;
        if (userInfo.birthdate) {
          const newDate = dataServices.formatEditDate(userInfo.birthdate);
          userInfo["year"] = newDate[0];
          userInfo["month"] = newDate[1] - 1;
          userInfo["day"] = newDate[2];
        }

        let updatedUserInfo = dataServices.updateUserInfo(updateForm, userInfo);
        this.setState({
          authFormType: updatedUserInfo,
          isValidForm: true,
          showWristbandInfo: true,
          date: {
            day: userInfo["day"],
            month: userInfo["month"] + 1,
            year: userInfo["year"]
          }
        });
      } else {
        let form = pickBy(nextProps.form, item => item.show);
        this.setState(state => {
          state.authFormType = form;
          state.formData = {};
          state.isValidForm = false;

          return state;
        });
      }
    }
    this.setState({ loading: false });
  }
  addClass = () => {
    let appClass = document.querySelector(".App");
    if (this.props.location.pathname === "/auth") {
      appClass.classList.remove("login");
      appClass.classList.add("register");
      appClass.style.height = "auto";
    }
  };

  handleSubmit = async e => {
    const {
      createOrder,
      createProfile,
      updateOrder,
      verifyWristbandAndRegister
    } = Config.components.register.onSubmit;
    this.setState({ loading: true });
    e.preventDefault();

    const stateData = {
      ...this.state.authFormType
    };

    const date = { ...this.state.date };

    const formatDate = [
      get(date, "year"),
      get(date, "month"),
      get(date, "day")
    ].join("-");

    if (this.props.location.pathname === "/home/personal-details") {
      await this.updateProfile(stateData, formatDate);
    } else {
      if (createOrder) await this.createOrder(stateData, formatDate);
      if (createProfile) await this.createProfile(stateData, formatDate);
      if (updateOrder) await this.updateOrder(stateData, formatDate);
      if (verifyWristbandAndRegister) {
        await this.createProfile(stateData, formatDate);
      }
    }
  };

  createProfile = (stateData, formatDate) => {
    this.setState({ loading: true });
    let UID = Auth.getUID();
    let postDataRegister = dataServices.postUserInfo(
      stateData,
      UID,
      formatDate
    );
    postDataRegister["verificationEmail"] = "True";
    this.props.createProfileClicked(postDataRegister, "setUserInfo");
  };
  updateProfile = (stateData, formatDate) => {
    let UID = Auth.getUID();
    let updateData = dataServices.postUserInfo(stateData, UID, formatDate);

    let userId = Auth.getUserId();
    updateData["user_id"] = userId;
    this.props.updateProfileClicked(updateData, "updateUserInfo");
  };

  createOrder = async (stateData, formatDate) => {
    let createOrderData = dataServices.getCreateOrderData(
      stateData,
      formatDate
    );
    if (this.state.isValidForm) {
      await this.setState({ formData: createOrderData });
    }
    this.props.createOrderClicked(createOrderData, "updateOrCreateOrder");
  };

  updateOrder = (stateData, formatDate) => {
    let updateOrderData = dataServices.getCreateOrderData(
      stateData,
      formatDate
    );
    if (this.state.isValidForm) {
      this.setState({ formData: updateOrderData });
    }
    this.props.updateOrderClicked(updateOrderData, "getUpdateOrderData");
  };

  changeDateHandler = (date, inputIdentifier) => {
    const updateAuthForm = {
      ...this.state.authFormType
    };
    const dateFields = { ...this.state.date };
    const updateFormElement = { ...updateAuthForm[inputIdentifier] };

    updateFormElement.value = date;
    if (
      inputIdentifier === "month" ||
      (inputIdentifier === "day" && date.length < 10)
    ) {
      if (inputIdentifier === "month") {
        date = Number(date) + 1;
      }
      dateFields[inputIdentifier] = date.toString().padStart(2, "0");
    } else {
      dateFields[inputIdentifier] = date;
    }

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
      state.date = dateFields;
      return state;
    });
  };

  handleBack = () => {
    if (this.props.location.pathname === "/auth") {
      this.props.history.push("/");
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    let redirectToValidateEmail = <Redirect to="/validate-email" />;
    let redirectToHome = <Redirect to="/home" />;
    const { verifyWristbandAndRegister } = Config.components.register.onSubmit;
    const {
      activateWristband,
      activateBarcode
    } = Config.components.register.show;
    let inputs = this.state.authFormType;
    let self = this;
    const formContainer =
      this.props.location.pathname === "/home/personal-details"
        ? "form-container edit"
        : "form-container";
    return (
      <div className="register">
        <div className="app-content">
          {this.props.isValidateEmail && redirectToValidateEmail}
          {this.props.isProfileCreated && redirectToHome}
          <div className="header-container">
            {this.props.location.pathname === "/home/personal-details" && (
              <div className="personal-space-header">
                <h1 id="grey">
                  <Trans i18nKey="register:REGISTER_PERSONAL_INFO_TITLE">
                    Personal Space
                  </Trans>
                </h1>
                <p id="grey">
                  <Trans i18nKey="register:REGISTER_PERSONAL_INFO_DESCRIPTION">
                    This page allows you to manage your personal
                    information,including resetting your password.
                  </Trans>
                </p>
              </div>
            )}
          </div>
          <div className={formContainer}>
            <div className="container-fluid">
              <form
                className={`postForm `}
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
                <div className="personal-info">
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
                          label={get(input, "label")}
                          checked={get(input, "checked")}
                          blur={get(input, "blur")}
                          country={
                            this.state.authFormType.country &&
                            this.state.authFormType.country.value
                          }
                          changed={event =>
                            FormServices.inputChangedHandler(event, key, self)
                          }
                          changeDate={this.changeDateHandler}
                          changePhone={phone =>
                            FormServices.inputChangedHandler(
                              phone,
                              key,
                              self,
                              true
                            )
                          }
                          checkValidation={() =>
                            FormServices.checkvalidityOnBlur(key, self)
                          }
                          changeAdress={adress =>
                            FormServices.inputChangedHandler(
                              adress,
                              key,
                              self,
                              true
                            )
                          }
                        />
                      );
                    })}

                    <div className="col-md-12 buttonContainer">
                      {this.props.location.pathname === "/auth" && (
                        <Button
                          onClick={this.handleBack}
                          label="primary"
                          className={"light button primary"}
                        >
                          <Trans i18nKey="BACK_BTN">Back</Trans>
                        </Button>
                      )}
                      {this.props.location.pathname ===
                        "/home/personal-details" && (
                        <Button
                          label="Submit"
                          primary
                          type="submit"
                          disabled={!this.state.isValidForm}
                        >
                          <Trans i18nKey="CONFIRM_BTN">Confirm</Trans>
                        </Button>
                      )}

                      {this.props.location.pathname === "/auth" && (
                        <Button
                          label="Submit"
                          primary
                          type="submit"
                          disabled={!this.state.isValidForm}
                        >
                          <Trans i18nKey="register:REGISTER_BTN">
                            Register
                          </Trans>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isProfileCreated: state.register.isProfileCreated,
    isValidateEmail: state.register.isValidateEmail,
    isWristbandValid:
      state.activateWristband && state.activateWristband.isWristbandValid,
    newWristbandInfo:
      state.activateWristband && state.activateWristband.newWristbandInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createProfileClicked: formData => dispatch(createProfileClicked(formData)),
    updateProfileClicked: formData => dispatch(updateProfileClicked(formData)),
    createOrderClicked: formData => dispatch(createOrderClicked(formData)),
    updateOrderClicked: formData => dispatch(updateOrderClicked(formData))
  };
};

export default withReducer("register", registerReducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withRouter(WrappedTranslationRegister(withNamespaces("register")(Register)))
  )
);
