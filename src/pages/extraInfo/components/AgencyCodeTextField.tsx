import { RepresentativeRegistration } from "@/models";
import { StyledAdorment } from "@components/index";
import { CircularProgress, TextField, useTheme } from "@mui/material";
import { showSnackbar, validateError, validateHelper } from "@utils/index";
import { FormikProps } from "formik";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import { useCheckAgencyCode } from "@hooks/index";
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
interface AgentCodeTextFieldProps {
  formik: FormikProps<
    Omit<
      RepresentativeRegistration,
      "first_name" | "last_name" | "phone_number"
    >
  >;
}
const AgencyCodeTextField = ({ formik }: AgentCodeTextFieldProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isAgencyCodeDuplicate, setIsAgencyCodeDuplicate] = useState(false);
  const handleClearAgentCode = () => {
    formik.setFieldValue("agent_code", "");
  };
  const { isPending, mutate: checkAgencyCode } = useCheckAgencyCode({
    onSuccess: () => {
      setIsAgencyCodeDuplicate(true);
    },
    onError: (error) => {
      showSnackbar(error.response.data.error_details.fa_details, {
        variant: "error",
      });
      setIsAgencyCodeDuplicate(false);
    },
  });
  // this effect works as debouncer to prevent repetetive api calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formik.values.agent_code) {
        checkAgencyCode({ agent_code: formik.values.agent_code });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formik.values.agent_code, checkAgencyCode]);
  return (
    <TextField
      fullWidth
      label={t("extraInfo.agent_code")}
      name="agent_code"
      id="agent_code"
      type="tel"
      value={formik.values.agent_code || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={validateError(formik, "agent_code")}
      helperText={validateHelper(formik, "agent_code")}
      slotProps={{
        htmlInput: {
          dir: "ltr",
        },
        input: {
          startAdornment: (
            <StyledAdorment position="start">
              <HighlightOffIcon onClick={handleClearAgentCode} />
              {isPending && <CircularProgress size={20} />}
              {isAgencyCodeDuplicate &&
                !isPending &&
                formik.values.agent_code && (
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
  );
};

export default AgencyCodeTextField;
