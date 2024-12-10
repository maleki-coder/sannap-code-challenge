import en from "../en/translation.json";
import fa from "../fa/translation.json";

const resources = {
    en,
    fa,
} as const;

export default resources;
declare module "i18next" {
    interface CustomTypeOptions {
        // resources: typeof resources;
        returnNull: false;
    }
}
