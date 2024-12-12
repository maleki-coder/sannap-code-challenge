import { RepresentativeRegistration } from "@store/index";

/**
 * Helper method to determine if there's an error for a field
 * @param {Record<string, boolean>} touched - Whether the field has been touched
 * @param {Record<string, string>} errors - The Formik errors object
 * @param {keyof RepresentativeRegistration} field - The name of the field, constrained to keys of RepresentativeRegistration
 * @returns {boolean} True if there's an error, false otherwise
 */
export const validateError = (
  touched: Record<string, boolean>,
  errors: Record<string, string>,
  field: keyof RepresentativeRegistration | "tempCode" | "tempPhoneNumber"
): boolean => {
  return touched[field] && Boolean(errors[field]);
};
