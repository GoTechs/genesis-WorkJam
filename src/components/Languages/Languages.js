import React, { Component } from "react";
import "./styles.sass";
import { withNamespaces } from "react-i18next";
import Config from "../../Config/languages.json";

class Language extends Component {
  render() {
    const { lng, languageCliked } = this.props;
    const { Languages } = Config.internationalization;
    const {
      toggleSwitcher,
      listSwitcher
    } = Config.internationalization.switcherType;
    const options = Languages;

    let languages = options
      .filter(language => language.active)
      .map((language, index) => {
        if (toggleSwitcher) {
          return (
            <li
              value={lng}
              key={index}
              onClick={() => languageCliked(language.key)}
            >
              <a>{language.name}</a>
            </li>
          );
        }

        if (listSwitcher) {
          return (
            <option key={index} value={language.key}>
              {language.name}
            </option>
          );
        }
      });

    return (
      <div className="Language">
        {toggleSwitcher && languages.length > 1 && <ul>{languages}</ul>}
        {listSwitcher && languages.length > 1 && (
          <div className={"select-style"}>
            <select
              value={lng}
              onChange={event => languageCliked(event.target.value)}
            >
              {languages}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default withNamespaces("translation")(Language);
