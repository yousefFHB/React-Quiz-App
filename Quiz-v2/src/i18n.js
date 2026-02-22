import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationFa from "./locales/fr/translation.json";

const persistedLanguage = localStorage.getItem("app_language");
const initialLanguage =
  persistedLanguage === "en" ||
  persistedLanguage === "fa" ||
  persistedLanguage === "fr" ||
  persistedLanguage === "pr"
    ? persistedLanguage
    : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    fa: {
      translation: translationFa,
    },
    fr: {
      translation: translationFa,
    },
    pr: {
      translation: translationFa,
    },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
