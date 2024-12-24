import { ErrorData } from "@infra/index";
import { attributeTranslationMap } from "./attributeTranslationsMap";
import { RepresentativeRegistration } from "@/models";

export const translateErrorMessage = (error: ErrorData, attribute : keyof RepresentativeRegistration) => {
  const { attr, fa_details } = error.error_details;

  // Check if translation for the attribute exists
  const translatedAttr = attributeTranslationMap[attribute];

  // Replace the attribute in fa_details with its translation
  return fa_details.replace(attr, translatedAttr);
};
