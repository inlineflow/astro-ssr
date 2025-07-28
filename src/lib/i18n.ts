import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruTranslation from "./locales/ru/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  debug: true,
  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
});

export default i18n;
