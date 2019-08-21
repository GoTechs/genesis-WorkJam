import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import { Trans, withNamespaces } from "react-i18next";

const dropdown = props => {
  return (
    <div className="dorpdown">
      <div className="name-dropdown" />
      {props.showDropdown ? (
        <div>
          <ul>
            <NavigationItem
              class=""
              link="/home/personal-details"
              handleToggle={props.handleToggle}
            >
              <Trans i18nKey="PERSONAL_DETAILS_LINK">Personal details</Trans>
            </NavigationItem>
            <NavigationItem
              class=""
              link="/home/contact-support"
              handleToggle={props.handleToggle}
            >
              <Trans i18nKey="LOGOUT_BTN">logout</Trans>
            </NavigationItem>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default withNamespaces("translation")(dropdown);
