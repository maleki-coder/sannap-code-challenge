import { TextField, Typography, useTheme } from "@mui/material";
import { StyledHeaderBox, StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateOtp } from "@hooks/useCreateOtp";
import { useNavigate } from "react-router-dom";
import {
  RepresentativeRegistration,
  useRepresentativeStore,
} from "@store/index";
export function PhoneNumber() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const initialValues: Pick<RepresentativeRegistration, "phone_number"> = {
    phone_number: null,
  };
  const validationSchema = yup.object({
    phone_number: yup
      .string()
      .required(t("phoneNumber.required"))
      .matches(/^\d{11}$/, t("phoneNumber.minimum_number_error")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      await sendOtpSms({ phone_number: formik.values.phone_number });
    },
  });
  const { isPending, mutate: sendOtpSms } = useCreateOtp({
    onSuccess: () => {
      updateRepresentative({ phone_number: formik.values.phone_number });
      navigate("/register/validateOtp");
    },
  });
  return (
    <>
      <StyledHeaderBox>
        <Typography
          color={theme.palette["customBlack"].main}
          variant="body1"
          fontWeight={600}
          textAlign="center"
        >
          {t("phoneNumber.title")}
        </Typography>
        <Typography
          color={theme.palette["customBlack"].main}
          variant="body2"
          fontWeight={300}
          textAlign="center"
        >
          {t("phoneNumber.code_will_be_sent")}
        </Typography>
      </StyledHeaderBox>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <TextField
          fullWidth
          label={t("phoneNumber.number")}
          name="phone_number"
          id="phone_number"
          value={formik.values.phone_number || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={
            formik.touched.phone_number &&
            typeof formik.errors.phone_number === "string"
              ? formik.errors.phone_number
              : ""
          }
          required
          disabled={isPending}
        ></TextField>
        <LoadingButton
          loading={isPending}
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
