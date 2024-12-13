import { FormikProps } from "formik";
import { RepresentativeRegistration } from "@store/index";

/**
 * Helper method to determine if there's an error for a field
 * @param {FormikProps<any>} formik - The Formik object
 * @param {keyof RepresentativeRegistration | "tempPhoneCode" | "tempPhoneNumber"} field - The name of the field
 * @returns {boolean} True if there's an error, false otherwise
 */
export const validateError = (
  formik: FormikProps<any>,
  field: keyof RepresentativeRegistration | "tempPhoneCode" | "tempPhoneNumber"
): boolean => {
  return formik.touched[field] && Boolean(formik.errors[field]);
};
