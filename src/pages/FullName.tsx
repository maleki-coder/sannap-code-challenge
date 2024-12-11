import { TextField, useTheme } from "@mui/material";
import { StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import {
  RepresentativeRegistration,
  useRepresentativeStore,
} from "@store/index";
export function FullName() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const {  updateRepresentative } = useRepresentativeStore();
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
      navigate('/register/extraInfo');
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
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={
            formik.touched.first_name &&
            typeof formik.errors.first_name === "string"
              ? formik.errors.first_name
              : ""
          }
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
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={
            formik.touched.last_name &&
            typeof formik.errors.last_name === "string"
              ? formik.errors.last_name
              : ""
          }
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
