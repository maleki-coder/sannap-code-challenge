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
import { ErrorData } from "@infra/index";
import { AxiosError } from "axios";
interface AgentCodeTextFieldProps {
  formik: FormikProps<
    Omit<
      RepresentativeRegistration,
      "first_name" | "last_name" | "phone_number"
    >
  >;
  passIsAgencyCodeDuplicate: (agencyCodeDuplication: boolean) => void;
}
const AgencyCodeTextField = ({
  formik,
  passIsAgencyCodeDuplicate,
}: AgentCodeTextFieldProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isAgencyCodeDuplicate, setIsAgencyCodeDuplicate] = useState(false);
  const handleClearAgentCode = () => {
    formik.setFieldValue("agent_code", "");
  };
  const { isPending, mutate: checkAgencyCode } = useCheckAgencyCode({
    onSuccess: () => {
      setIsAgencyCodeDuplicate(true);
      passIsAgencyCodeDuplicate(true);
    },
    onError: (error: AxiosError<ErrorData>) => {
      showSnackbar(error.response.data.error_details.fa_details, {
        variant: "error",
      });
      setIsAgencyCodeDuplicate(false);
      passIsAgencyCodeDuplicate(false);
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ![
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key) &&
      !/^[0-9۰-۹]$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };
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
      onKeyDown={handleKeyDown}
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
                    sx={{ color: theme.palette.customGreen.light }}
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
