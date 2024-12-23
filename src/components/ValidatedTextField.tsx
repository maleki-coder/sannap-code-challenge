import { RepresentativeRegistration } from "@/models";
import { TextField } from "@mui/material";
import { validateError, validateHelper } from "@utils/index";
import { FormikProps } from "formik";

interface ValidatedTextFieldProps {
  formik: FormikProps<any>;
  name: keyof RepresentativeRegistration;
  id: keyof RepresentativeRegistration;
  translationLabel?: string;
  dir?: "ltr" | "rtl";
  [key: string]: any;
}
export const ValidatedTextField = ({
  formik,
  name,
  id,
  dir,
  translationLabel,
  ...props
}: ValidatedTextFieldProps) => {
  return (
    <TextField
      {...props}
      label={translationLabel}
      name={name as keyof RepresentativeRegistration}
      id={id}
      value={formik.values[name] || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={validateError(formik, name as keyof RepresentativeRegistration)}
      helperText={validateHelper(
        formik,
        name as keyof RepresentativeRegistration
      )}
      slotProps={{
        htmlInput: {
          dir: dir,
        },
      }}
    ></TextField>
  );
};
