import { Typography, useTheme } from "@mui/material";
import { StyledHeaderBox, StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import OtpInput from "react-otp-input";
import { useValidateOtp } from "@hooks/useValidateOtp";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { showSnackbar } from "@utils/snackBarUtils";
import { DayGreenLoadingButton } from "@components/index";
import { ErrorData } from "@infra/index";
import { AxiosError } from "axios";
export function ValidateOtp() {
  const { setCurrentStep } = useStepperStore();
  const { representative } = useRepresentativeStore();
  const { isPending, mutate: validateOtp } = useValidateOtp({
    onSuccess: () => {
      setCurrentStep(3);
    },
    onError: (error: AxiosError<ErrorData>) => {
      showSnackbar(error.response.data.error_details, {
        variant: "error",
      });
    },
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const initialValues = {
    code: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      validateOtp({
        code: Number(formik.values.code),
        phone_number: representative.phone_number,
      });
    },
  });

  const updateFormValue = (value: string) => {
    formik.setFieldValue("code", value);
  };
  return (
    <>
      <StyledHeaderBox>
        <Typography
          color={theme.palette.common.black}
          variant="body1"
          fontWeight={600}
          textAlign="center"
        >
          {t("validateOtp.title")}
        </Typography>
        <Typography
          color={theme.palette.common.black}
          variant="body2"
          fontWeight={300}
          textAlign="center"
        >
          {representative.phone_number}
        </Typography>
      </StyledHeaderBox>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <OtpInput
          containerStyle={{
            direction: "ltr",
            width: "100%",
            justifyContent: "space-around",
          }}
          inputType="tel"
          value={formik.values.code}
          onChange={(value) => updateFormValue(value)}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: `1px solid ${theme.palette.customGray.light}`,
            borderRadius: theme.spacing(1),
            width: "54px",
            height: "54px",
          }}
        />
        <DayGreenLoadingButton
          loading={isPending}
          fullWidth
          type="submit"
          disabled={formik.values.code.length != 5 || !formik.dirty}
        >
          {t("general.continue")}
        </DayGreenLoadingButton>
      </StyledForm>
    </>
  );
}
