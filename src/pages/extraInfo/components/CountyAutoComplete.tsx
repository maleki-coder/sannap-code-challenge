import { RepresentativeRegistration } from "@/models";
import { useFetchListOfCities } from "@hooks/index";
import { Autocomplete, TextField } from "@mui/material";
import { validateError, validateHelper } from "@utils/index";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

interface CountyAutoCompleteProps {
  formik: FormikProps<
    Omit<
      RepresentativeRegistration,
      "first_name" | "last_name" | "phone_number"
    >
  >;
}

const CountyAutoComplete = (props: CountyAutoCompleteProps) => {
  const { isPending: isFetchCitiesPending, data: cities } =
    useFetchListOfCities(props.formik.values.province);
  const { t } = useTranslation();
  return (
    <Autocomplete
      fullWidth
      disablePortal
      onChange={(_event, option) =>
        props.formik.setFieldValue("county", option?.id)
      }
      disabled={!props.formik.values.province}
      onBlur={props.formik.handleBlur}
      options={cities || []}
      loading={isFetchCitiesPending}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          name="county"
          id="county"
          error={validateError(props.formik, "county")}
          helperText={validateHelper(props.formik, "county")}
          {...params}
          label={t("extraInfo.county")}
        />
      )}
    />
  );
};

export default CountyAutoComplete;
