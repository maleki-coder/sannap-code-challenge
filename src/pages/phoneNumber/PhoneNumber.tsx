
import { TextField, Typography, useTheme } from "@mui/material";
// import {StyledHeaderBox} from "@/pages/phoneNumber/StyledHeaderBox"
import {StyledHeaderBox , StyledForm} from "@/pages/phoneNumber/index"
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateOtp } from "@hooks/useCreateOtp";
import { useNavigate } from "react-router-dom";
export function RegisterPhoneNumber() {
  const navigate = useNavigate();
    const {isPending ,mutate : sendOtpSms} = useCreateOtp({
      onSuccess : (data) => {
        console.log(data)
        // navigate("./")
      }
    });
    const theme = useTheme();
    const { t } = useTranslation();
    const initialValues = {
      phoneNumber: null,
      
    };
    const validationSchema = yup.object({
      phoneNumber: yup.string()
      .required(t("phoneNumber.required"))
      .matches(/^\d{11}$/, t("phoneNumber.minimunNumberError")),
    });
  
     const formik = useFormik({
       initialValues: initialValues,
       validationSchema: validationSchema,
       onSubmit: async () => {
         await sendOtpSms({phone_number : formik.values.phoneNumber});
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
            {t("phoneNumber.title")}
          </Typography>
        </StyledHeaderBox>
        <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
          <TextField
            fullWidth
            label={t("phoneNumber.number")}
            name="phoneNumber"
            id="phoneNumber"
            value={formik.values.phoneNumber || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={
              formik.touched.phoneNumber &&
              typeof formik.errors.phoneNumber === "string"
                ? formik.errors.phoneNumber
                : ""
            }
            required
            disabled={isPending}
            autoComplete="phoneNumber"
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
