import { Typography, useTheme } from "@mui/material";
import { StyledHeaderBox, StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import OtpInput from "react-otp-input";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useValidateOtp } from "@hooks/useValidateOpt";
import { useRepresentativeStore } from "@store/index";
export function ValidateOtp() {
  const navigate = useNavigate();
  const { representative } = useRepresentativeStore();
  const { isPending, mutate: validateOtp } = useValidateOtp({
    onSuccess: () => {
      navigate("/register/fullname");
    },
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const initialValues = {
    code: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
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
          color={theme.palette["customBlack"].main}
          variant="body1"
          fontWeight={600}
          textAlign="center"
        >
          {t("validateOtp.title")}
        </Typography>
        <Typography
          color={theme.palette["customBlack"].main}
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
          value={formik.values.code}
          onChange={(value) => updateFormValue(value)}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: `1px solid ${theme.palette["customGray"].light}`,
            borderRadius: theme.spacing(1),
            width: "54px",
            height: "54px",
          }}
        />
        <LoadingButton
          loading={isPending}
          fullWidth
          type="submit"
          disabled={formik.values.code.length != 5 || !formik.dirty}
          variant="dayGreen"
        >
          {t("general.continue")}
        </LoadingButton>
      </StyledForm>
    </>
  );
}
