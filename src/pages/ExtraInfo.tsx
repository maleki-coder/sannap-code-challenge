import {
  CircularProgress,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { StyledAdorment } from "@components/index";
import { useCheckAgencyCode } from "@hooks/useCheckAgencyCode";
import { useEffect, useState } from "react";
import { showSnackbar } from "@utils/index";
export function ExtraInfo() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const initialValues: Omit<
    RepresentativeRegistration,
    "code" | "first_name" | "last_name"
  > = {
    agent_code: "",
    address: "",
    agency_type: "",
    city_code: "",
    county_code: "",
    insurance_branch: "",
    phone: "",
    phone_number: "",
    province: "",
    name: "",
  };
  const [isAgencyCodeDuplicate, setIsAgencyCodeDuplicate] = useState(false);
  const { isPending, mutate: checkAgencyCode } = useCheckAgencyCode({
    onSuccess: () => {
      setIsAgencyCodeDuplicate(true);
    },
    onError: (data: any) => {
      showSnackbar(data.response.data.message, { variant: "error" });
      setIsAgencyCodeDuplicate(false);
    },
  });
  const validationSchema = yup.object({
    agent_code: yup.string().required(t("extraInfo.agent_code_required")),
    // last_name: yup.string().required(t("fullName.lastName_required")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      updateRepresentative({
        agent_code: formik.values.agent_code,
        // last_name: formik.values.last_name,
      });
      // navigate("/register/extraInfo");
    },
  });
  const handleClearAgentCode = () => {
    formik.setFieldValue("agent_code", "");
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formik.values.agent_code) {
        checkAgencyCode({ agent_code: formik.values.agent_code });
      }
    }, 500);

    return () => clearTimeout(timeoutId); // Clears timeout on every change
  }, [formik.values.agent_code, checkAgencyCode]);
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <TextField
          fullWidth
          label={t("extraInfo.agent_code")}
          name="agent_code"
          id="agent_code"
          value={formik.values.agent_code || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.agent_code && Boolean(formik.errors.agent_code)}
          helperText={
            formik.touched.agent_code &&
            typeof formik.errors.agent_code === "string"
              ? formik.errors.agent_code
              : ""
          }
          slotProps={{
            htmlInput: {
              dir: "ltr",
            },
            input: {
              startAdornment: (
                <StyledAdorment position="start">
                  <HighlightOffIcon onClick={handleClearAgentCode} />
                  {isPending && <CircularProgress size={20} />}
                  {isAgencyCodeDuplicate && !isPending && (
                    <CheckCircleOutlineIcon
                      sx={{ color: theme.palette["customGreen2"].main }}
                    />
                  )}
                </StyledAdorment>
              ),
            },
          }}
          required
        ></TextField>
        {/* <TextField
          fullWidth
          label={t("extraInfo.province")}
          name="province"
          id="province"
          value={formik.values.province || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.province && Boolean(formik.errors.province)}
          helperText={
            formik.touched.province &&
            typeof formik.errors.province === "string"
              ? formik.errors.province
              : ""
          }
          required
        ></TextField> */}
        <LoadingButton
          fullWidth
          type="submit"
          disabled={!formik.isValid || !formik.dirty || !isAgencyCodeDuplicate}
          variant="dayGreen"
        >
          {t("general.continue")}
        </LoadingButton>
      </StyledForm>
    </>
  );
}
