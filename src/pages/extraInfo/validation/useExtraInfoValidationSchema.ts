import * as yup from "yup";

const useExtraInfoValidationSchema = (t) => {
  return yup.object({
    agent_code: yup.string().required(t("extraInfo.agent_code_required")),
    province: yup.string().required(t("extraInfo.province_required")),
    county: yup.string().required(t("extraInfo.county_required")),
    city_code: yup
      .string()
      .required(t("extraInfo.city_code_required"))
      .matches(/^[۰-۹0-9]+$/, t("extraInfo.city_code_not_correct")),
    insurance_branch: yup
      .string()
      .required(t("extraInfo.insurance_branch_required")),
    phone: yup
      .string()
      .required(t("extraInfo.phone_required"))
      .matches(/^[۰-۹0-9]+$/, t("extraInfo.phone_not_correct")),
    name: yup.string().when("agency_type", {
      is: "legal",
      then: (schema) => schema.required(t("extraInfo.agent_name_required")),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
};

export default useExtraInfoValidationSchema;
