import { TextField } from "@mui/material";
import { StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  RepresentativeRegistration,
  useRepresentativeStore,
  useStepperStore,
} from "@store/index";
import { validateError, validateHelper } from "@utils/index";
export function FullName() {
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const { setCurrentStep, setAllowedStep } = useStepperStore();
  const initialValues: Pick<
    RepresentativeRegistration,
    "first_name" | "last_name"
  > = {
    first_name: null,
    last_name: null,
  };
  const validationSchema = yup.object({
    first_name: yup.string().required(t("fullName.firstName_required")),
    last_name: yup.string().required(t("fullName.lastName_required")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      updateRepresentative({
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
      });
      setCurrentStep(4);
      setAllowedStep(4);
    },
  });
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <TextField
          fullWidth
          label={t("fullName.first_name")}
          name="first_name"
          id="first_name"
          value={formik.values.first_name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={validateError(formik, "first_name")}
          helperText={validateHelper(
            formik,
            "first_name"
          )}
          required
        ></TextField>
        <TextField
          fullWidth
          label={t("fullName.last_name")}
          name="last_name"
          id="last_name"
          value={formik.values.last_name || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={validateError(formik, "last_name")}
          helperText={validateHelper(
            formik,
            "last_name"
          )}
          required
        ></TextField>
        <LoadingButton
          fullWidth
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          variant="dayGreen"
        >
          {t("general.continue")}
        </LoadingButton>
      </StyledForm>
    </>
  );
}
