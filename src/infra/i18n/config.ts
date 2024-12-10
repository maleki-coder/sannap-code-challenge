import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import fa from "./fa/translation.json";

i18next.use(initReactI18next).init({
    lng: "fa",
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: en,
        },
        fa: {
            translation: fa,
        },
    }
});
export default i18next;
