/**
 *
 * Reset Password
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, map } from "lodash";
import Button from "../../components/Button/index";
import Input from "../../components/Input/index";
import wrappedTranslation from "../../Common/HOC/WrappedTranslationResetPassword";
import Api from "../../Services/api";
import FormServices from "../../Services/formServices";
import { Trans, withNamespaces } from "react-i18next";
import Loader from "../../components/Loading/index";
import { toast } from "react-toastify";
import helpers from "../../Services/helpers";

class ResetPassword extends Component {
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

    const id = this.props.match.params.id;

    try {
      let response = await Api.apiCall({ user_id: id }, "getSaltPassword");
      let isReset = await Api.apiCall(
        {
          user_id: id,
          password: formData["password"],
          salt: response.salt
        },
        "resetPassword"
      );
      if (isReset["success"]) {
        await toast.success(<Trans i18nKey="RESET_PASSWORD_SUCCESS" />);
        await helpers.redirect("/auth/login", this);
      } else {
        await toast.error(
          <Trans i18nKey="RESET_PASSWORD_FAILED">reset password failed</Trans>
        );
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      toast.error(
        <Trans i18nKey="FAILED_SERVER_API">
          Unexpected internal server error.
        </Trans>
      );
    }
  };

  render() {
    let inputs = this.state.authFormType;
    let self = this;
    return (
      <div className="loginAuthPage">
        <div className="wrapper">
          {this.state.loading && <Loader />}

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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.defaultProps = {};
ResetPassword.propTypes = {
  loading: PropTypes.bool,
  lng: PropTypes.string,
  form: PropTypes.object
};

export default wrappedTranslation(withNamespaces("translation")(ResetPassword));
