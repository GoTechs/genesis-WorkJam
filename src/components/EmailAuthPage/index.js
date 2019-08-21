/**
 *
 * Email Auth Page
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { get, map } from "lodash";
import Button from "../../components/Button/index";
import Input from "../../components/Input/index";
import wrappedTranslationEmailAuth from "../../Common/HOC/WrappedTranslationEmailAuth";
import Api from "../../Services/api";
import Auth from "../../Services/auth";
import FormServices from "../../Services/formServices";
import { withNamespaces, Trans } from "react-i18next";
import Loader from "../../components/Loading/index";
import "./styles.sass";
import { toast } from "react-toastify";

class EmailAuthPage extends Component {
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

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (let formElement in this.state.authFormType) {
      formData[formElement] = this.state.authFormType[formElement].value;
    }
    if (this.state.isValidForm) {
      this.setState({ formData: formData });

      Api.apiCall(formData, "VerifyEmail")
        .then(response => {
          Auth.setUserExistense(response);
          if (response["success"] === undefined) {
            this.setState({ loading: false });
            return this.props.history.push("/error");
          }
          if (response["success"] === false) {
            this.setState({ loading: false });
            return this.props.history.push("/register");
          } else {
            this.setState({ loading: false });
            return this.props.history.push("/already-exist");
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          toast.error(
            <Trans i18nKey="FAILED_SERVER_API">
              Unexpected internal server error.
            </Trans>
          );
        });
    }
  };

  render() {
    let inputs = this.state.authFormType;
    let self = this;
    return (
      <div className="loginAuthPage">
        <div className="wrapper">
          {this.state.loading && <Loader />}
          <div className="headerContainer" />

          <div className="form-container">
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
                      {" "}
                      next
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

EmailAuthPage.defaultProps = {};
EmailAuthPage.propTypes = {
  loading: PropTypes.bool,
  lng: PropTypes.string,
  form: PropTypes.object
};

export default wrappedTranslationEmailAuth(
  withNamespaces("translation")(EmailAuthPage)
);
