import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import Config from "./Config/languages.json";

const fallbackLng = Config.internationalization.switcherType.default;

i18n

    .use(Backend)

    .use(LanguageDetector)

    .use(reactI18nextModule)

    .init({
        lng: fallbackLng,
        fallbackLng: fallbackLng,
        debug: true,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    });

export default i18n;
