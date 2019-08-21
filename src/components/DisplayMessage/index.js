/**
 * Component that will handle the error, success and the existense of the user
 */

import React from "react";
import Auth from "../../Services/auth";
import Button from "../../components/Button";
import { Trans, withNamespaces } from "react-i18next";

const diplayMessage = props => {
  let element = null;

  switch (props.match.path) {
    case "/success":
      element = (
        <div className="success">
          <h1>
            <Trans i18nKey="REGISTRATION_SUCCESS">
              Congratulation, you are registered
            </Trans>
          </h1>
          <h3>
            <Trans i18nKey="NICK_NAME_DESCRIPTION">
              Here is your new name for the event
            </Trans>
          </h3>
          <div className="display-name">
            <h1>Black Bart</h1>
            <p>
              <Trans i18nKey="EMAIL_SENT_DESCRIPTION">
                An email has just been sent to you with additional information
                about the event.
              </Trans>
            </p>
          </div>
        </div>
      );
      break;
    case "/error":
      element = (
        <div>
          <h1>
            <Trans i18nKey="ERROR_DESCRIPTION">Error!</Trans>
          </h1>
        </div>
      );
      break;
    case "/already-exist":
      element = (
        <div>
          <h1>
            <Trans i18nKey="ALREADY_REGISTERD">
              You are already registered
            </Trans>
          </h1>
          <h3>Enjoy the event!</h3>
        </div>
      );
      break;
    default:
      element = (
        <div>
          <h1>Error!</h1>
        </div>
      );
  }
  return (
    <div className="diplay-container">
      <div className={"txt-content"}>{element}</div>
      <Button
        onClick={() => {
          Auth.clearAppStorage();
          props.history.push("/");
        }}
        label="primary"
        style={{ width: "150" }}
        primary
      >
        Home
      </Button>
    </div>
  );
};

export default withNamespaces("translation")(diplayMessage);
