import { RepresentativeRegistration } from "@/models";
import { useFetchListBranches } from "@hooks/index";
import { Autocomplete, TextField } from "@mui/material";
import { validateError } from "@utils/validateError";
import { validateHelper } from "@utils/validateHelper";
import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface InsuranceBranchAutoCompleteProps {
  formik: FormikProps<
    Omit<
      RepresentativeRegistration,
      "first_name" | "last_name" | "phone_number"
    >
  >;
}
export const InsuranceBranchAutoComplete = (
  props: InsuranceBranchAutoCompleteProps
) => {
  const [branchSearchTerm, setBranchSearchTerm] = useState("");
  const { data: branches } = useFetchListBranches(branchSearchTerm);
  const { t } = useTranslation();
  return (
    <Autocomplete
      fullWidth
      disablePortal
      onChange={(_event, option) =>
        props.formik.setFieldValue("insurance_branch", option?.id)
      }
      disabled={!props.formik.values.province}
      onBlur={props.formik.handleBlur}
      options={branches || []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          key={params.id}
          name="insurance_branch"
          id="insurance_branch"
          error={validateError(props.formik, "insurance_branch")}
          helperText={validateHelper(props.formik, "insurance_branch")}
          onChange={(e) => setBranchSearchTerm(e.target.value)}
          {...params}
          label={t("extraInfo.insurance_branch")}
        />
      )}
    />
  );
};
