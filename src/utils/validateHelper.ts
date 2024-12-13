import { FormikProps } from "formik";
import { RepresentativeRegistration } from "@store/index";

/**
 * Helper method to get error message for Formik fields
 * @param {FormikProps<any>} formik - The Formik object
 * @param {keyof RepresentativeRegistration | "tempPhoneCode" | "tempPhoneNumber"} field - The name of the field
 * @returns {string} The error message for the field if available, otherwise an empty string
 */
export const validateHelper = (
  formik: FormikProps<any>,
  field: keyof RepresentativeRegistration | "tempPhoneCode" | "tempPhoneNumber"
): string => {
  return formik.touched[field] && typeof formik.errors[field] === "string"
    ? (formik.errors[field] as string)
    : "";
};
