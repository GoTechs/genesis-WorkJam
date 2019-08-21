import React, { Component } from "react";
import { Trans, withNamespaces } from "react-i18next";
import EditPersonalDetails from "../../containers/RegisterContainer";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import Api from "../../Services/api";
import { get } from "lodash";
import "./styles.sass";

class PersonalDetails extends Component {
  resetPassword = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    formData.email = this.props.mainUserInfo.email;

    formData.eventName = process.env.REACT_APP_EVENT_NAME;
    formData.lang = this.props.lng;
    formData.url = process.env.REACT_APP_URL;
    try {
      let response = await Api.apiCall(formData, "sendResetPassEmail");
      if (response["success"]) {
        await toast.success(
          <Trans i18nKey="FORGET_PASSWORD_SUCCESS">forget password sent</Trans>
        );
        await this.setState({ loading: false });
      } else {
        await toast.error(
          <Trans i18nKey="FORGET_PASSWORD_FAILD">
            there is a problem for reset password
          </Trans>
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
    let email = get(this.props.mainUserInfo, "email");
    return (
      <div className="personal-details">
        <EditPersonalDetails />
        <h2 className="h2_style" id="grey">
          <Trans i18nKey="EMAIL_TITLE">Email</Trans>
        </h2>
        <div className="email-edit">
          <h2 id="grey"> {email}</h2>
        </div>
        <h2 className="h2_style" id="grey">
          <Trans i18nKey="CHANGE_PASSWORD_BTN">Change Your Password</Trans>
        </h2>

        <Button primary onClick={this.resetPassword}>
          <Trans i18nKey="RESET_PASSWORD_BTN">RESET PASSWORD </Trans>
        </Button>
      </div>
    );
  }
}

export default withNamespaces("profile")(PersonalDetails);
