import { RepresentativeRegistration } from "@/models";
import { useFetchListOfProvinces } from "@hooks/index";
import { Autocomplete, TextField } from "@mui/material";
import { validateError, validateHelper } from "@utils/index";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

interface ProvinceAutoCompleteProps {
  formik: FormikProps<
    Omit<
      RepresentativeRegistration,
      "first_name" | "last_name" | "phone_number"
    >
  >;
}
const ProvinceAutoComplete = (props: ProvinceAutoCompleteProps) => {
  const { t } = useTranslation();
  const { data: provinces } = useFetchListOfProvinces();
  function handleProvinceChange(id: string): void {
    props.formik.setValues({
      ...props.formik.values,
      province: id,
      county: null,
      insurance_branch: null,
    });
  }

  return (
    <Autocomplete
      fullWidth
      disablePortal
      onChange={(_event, option) => handleProvinceChange(option?.id)}
      onBlur={props.formik.handleBlur}
      options={provinces || []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          name="province"
          id="province"
          error={validateError(props.formik, "province")}
          helperText={validateHelper(props.formik, "province")}
          {...params}
          label={t("extraInfo.province")}
        />
      )}
    />
  );
};

export default ProvinceAutoComplete;
