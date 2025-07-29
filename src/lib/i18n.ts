import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ruTranslation from "./locales/ru/translation.json";
import enTranslation from "./locales/en/translation.json";

export const languages = ["en", "ru", "ky"];
export const defaultLang = "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: languages,
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
    detection: {
      order: ["path"],
      caches: ["localStorage", "cookie"],
      //   : 0,
      //   checkWhiteList: true,
    },
  });

export default i18n;
