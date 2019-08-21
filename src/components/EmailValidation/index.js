import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.sass";
import Button from "../../components/Button";
import { Trans, withNamespaces } from "react-i18next";
import { toast } from "react-toastify";
import CheckedIcon from "../../assets/images/checked-white.png";

class EmailValidation extends Component {
  componentDidMount() {
    this.addClass();
  }

  addClass = () => {
    let appClass = document.querySelector(".App");
    if (this.props.location.pathname === "/validate-email") {
      appClass.classList.add("register");
      appClass.style.height = "100%";
    }
  };
  resendValidationEmail = () => {
    toast.success(
      <Trans i18nKey="RESEND_EMAIL">your validation is sent again</Trans>
    );
  };

  render() {
    return (
      <div className="validate-email">
        <img className="checked-icon" src={CheckedIcon} alt="checked-icon" />
        <h1>
          <Trans i18nKey="EMAIL_SENT_TITLE">Confirmation email sent </Trans>
        </h1>
        <p>
          <Trans i18nKey="ACTIVATE_EMAIL_DESCRIPTION">
            Please activate your account by clicking on link in the
            emailconfirmation we just sent you.
            <br />
            By activating your account, you’ll be able to planyour day in
            advance.
          </Trans>
        </p>
        <div className="button-group">
          <Button
            onClick={() => this.props.history.push("/auth/login")}
            label="primary"
            className={"light button primary"}
          >
            <Trans i18nKey="HOME_BTN">Home</Trans>
          </Button>
          <Button primary onClick={this.resendValidationEmail}>
            <Trans i18nKey="RESEND_BTN">Resend</Trans>
          </Button>
        </div>
      </div>
    );
  }
}

EmailValidation.propTypes = {};

export default withNamespaces("translation")(EmailValidation);
