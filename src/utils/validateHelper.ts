import { RepresentativeRegistration } from "@store/index";

/**
 * Helper method to get error message for Formik fields
 * @param {boolean} touched 
 * @param {string | object} errors
 * @param {string} field 
 * @returns {string}
 */
export const validateHelper = (
  touched,
  errors,
  field: keyof RepresentativeRegistration | "tempCode" | "tempPhoneNumber"
) => {
  return touched[field] && typeof errors[field] === "string"
    ? errors[field]
    : "";
};
