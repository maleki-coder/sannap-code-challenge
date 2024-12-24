import { Typography, useTheme } from "@mui/material";
import { StyledHeaderBox, StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateOtp } from "@hooks/useCreateOtp";
import { RepresentativeRegistration } from "@/models/index";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { showSnackbar, translateErrorMessage } from "@utils/index";
import { DayGreenLoadingButton, ValidatedTextField } from "@components/index";
import { AxiosError } from "axios";
import { ErrorData } from "@infra/index";

export function PhoneNumber() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const { setCurrentStep } = useStepperStore();
  const initialValues: Pick<RepresentativeRegistration, "phone_number"> = {
    phone_number: null,
  };
  const validationSchema = yup.object({
    phone_number: yup
      .string()
      .required(t("phoneNumber.required"))
      .matches(/^[۰-۹0-9]{11}$/, t("phoneNumber.minimum_number_error")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      sendOtpSms({ phone_number: formik.values.phone_number });
    },
  });
  const { isPending, mutate: sendOtpSms } = useCreateOtp({
    onSuccess: () => {
      updateRepresentative({ phone_number: formik.values.phone_number });
      setCurrentStep(2);
    },
    onError: (error: AxiosError<ErrorData>) => {
      showSnackbar(translateErrorMessage(error.response.data, "phone_number"), {
        variant: "error",
      });
    },
  });
  return (
    <>
      <StyledHeaderBox>
        <Typography
          color={theme.palette.common.black}
          variant="body1"
          fontWeight={600}
          textAlign="center"
        >
          {t("phoneNumber.title")}
        </Typography>
        <Typography
          color={theme.palette.common.black}
          variant="body2"
          fontWeight={300}
          textAlign="center"
        >
          {t("phoneNumber.code_will_be_sent")}
        </Typography>
      </StyledHeaderBox>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <ValidatedTextField
          formik={formik}
          translationLabel={t("phoneNumber.number")}
          name="phone_number"
          id="phone_number"
          disabled={isPending}
          required
          fullWidth
        />
        <DayGreenLoadingButton
          loading={isPending}
          fullWidth
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
        >
          {t("general.continue")}
        </DayGreenLoadingButton>
      </StyledForm>
    </>
  );
}
