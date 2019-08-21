import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { Trans, withNamespaces } from "react-i18next";
import { get, map } from "lodash";
import Loader from "../../components/Loading/index";
import Input from "../../components/Input";
import { withRouter } from "react-router-dom";
import FormServices from "../../Services/formServices";
import wrappedTranslation from "../../Common/HOC/WrappedContactTranslation";
import "./styles.sass";

class Contact extends Component {
  state = {
    authFormType: {},
    formData: {},
    loading: false,
    isValidForm: false,
    mainUserInfo: {},
    emailSend: false
  };
  componentWillMount() {
    this.setState(state => {
      state.authFormType = this.props.form;
      state.formData = {};
      state.mainUserInfo = this.props.mainUserInfo;
      return state;
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.lng !== this.props.lng) {
      this.setState(state => {
        state.authFormType = nextProps.form;
        state.formData = {};
        state.mainUserInfo = this.props.mainUserInfo;
        return state;
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });
    let form = { ...this.state.authFormType };
    const formData = {};

    for (let formElement in form) {
      formData[formElement] = form[formElement].value;
    }
    if (this.state.isValidForm) {
      this.setState({ formData: formData });

      //the handle submit part
      this.setState({ emailSend: true, loading: false });
    }
  };

  render() {
    let inputs = this.state.authFormType;
    let self = this;

    return (
      <div className="contact-container">
        <div className="contact">
          <div className="wrapper">
            {this.state.loading && <Loader />}
            <div className="contact-support-header">
              <h1 id="grey">
                <Trans i18nKey="contact:CONTACT_TITLE">Contact Support</Trans>
              </h1>
              <p id="grey">
                <Trans i18nKey="contact:CONTACT_DESCRIPTION">
                  Please provide as much details as possible and we will respond
                  to you in a timely manner.
                </Trans>
              </p>
            </div>

            {!this.state.emailSend && (
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
                            invalid={!get(input, "valid")}
                            shouldValidate={get(input, "validation")}
                            touched={get(input, "touched")}
                            label={get(input, "label")}
                            checked={get(input, "checked")}
                            changed={event =>
                              FormServices.inputChangedHandler(event, key, self)
                            }
                          />
                        );
                      })}

                      <Button
                        label="Submit"
                        primary
                        type="submit"
                        disabled={!this.state.isValidForm}
                      >
                        <Trans i18nKey="SEND_BTN">send</Trans>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {this.state.emailSend && (
              <div>
                <Button
                  onClick={() => this.props.history.push("/home")}
                  label="primary"
                  className={"light button primary"}
                >
                  <Trans i18nKey="HOME_BTN">home</Trans>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {};

export default withRouter(
  wrappedTranslation(withNamespaces("contact")(Contact))
);
