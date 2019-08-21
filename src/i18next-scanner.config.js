/* eslint no-console: 0 */
/* eslint strict: 0 */

const Languages = require("./Config/languages");

const fs = require("fs");
const chalk = require("chalk");

const languages = Languages.internationalization.Languages.map(
  (language, index) => {
    return language.key;
  }
);

module.exports = {
  src: [
    "src/**/*.{html,js,jsx}",
    // Use ! to filter out files or directories
    "!src/**/*.spec.{js,jsx}",
    "!src/i18n/**",
    "!test/**",
    "!**/node_modules/**"
  ],
  dest: "./",
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: false,
    lngs: languages,
    func: {
      list: [], // Use an empty array to bypass the default list: i18n.t, i18next.t
      extensions: [".js", ".jsx"]
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      extensions: [".js", ".jsx"],
      fallbackKey: function(ns, value) {
        return value;
      }
    },
    defaultValue: (lng, ns, key) => {
      if (lng === "en") {
        return key; // Use key as value for base language
      }
      return ""; // Return empty string for other languages
    },
    ns: [
      "translation", // default
      "login",
      "register",
      "wristband",
      "wallet",
      "contact",
      "profile"
    ],
    defaultNs: "translation",
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json", // or 'app/i18n/${lng}/${ns}.saveAll.json'
      jsonIndent: 4
    },
    nsSeparator: ":", // namespace separator
    keySeparator: ".", // key separator
    plural: true, // No plural form keys
    interpolation: {
      prefix: "{{",
      suffix: "}}"
    }
  },
  transform: function(file, enc, done) {
    "use strict";

    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ["i18n._", "i18n.__"] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `[i18next-scanner] transform: count=${chalk.cyan(
          count
        )}, file=${chalk.yellow(JSON.stringify(file.relative))}`
      );
    }

    done();
  }
};
