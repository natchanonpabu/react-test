import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../locales/en.json";
import th from "../../locales/th.json";
import { getLanguage } from "../../services/i18n";

i18n.use(initReactI18next).init({
  fallbackLng: getLanguage() || "en",
  resources: {
    en: { translation: en },
    th: { translation: th },
  },
  react: {
    useSuspense: false,
  },
});
