import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { validateError, validateHelper } from "@utils/index";
import { StyledForm } from "@/pages/phoneNumber/index";
import {
  StyledFormControlLabel,
  StyledFormLabel,
  StyledRadio,
  StyledRadioGroup,
} from "@/pages/extraInfo/index";
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
import {
  useFetchListBranches,
  useFetchListOfCities,
  useFetchListOfProvinces,
} from "@hooks/index";
import { AgentType } from "@/models";
export function ExtraInfo() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const [branchSearchTerm, setBranchSearchTerm] = useState("");
  const [isLegalFieldVisible, setIsLegalFieldVisible] = useState(false);
  const initialValues: Omit<
    RepresentativeRegistration,
    "code" | "first_name" | "last_name"
  > & {
    tempCode: string;
    tempPhoneNumber: string;
  } = {
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
    tempCode: "",
    tempPhoneNumber: "",
  };
  const validationSchema = yup.object({
    agent_code: yup.string().required(t("extraInfo.agent_code_required")),
    province: yup.string().required(t("extraInfo.province_required")),
    city_code: yup.string().required(t("extraInfo.city_required")),
    insurance_branch: yup
      .string()
      .required(t("extraInfo.insurance_branch_required")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      updateRepresentative({
        agent_code: formik.values.agent_code,
      });
      // navigate("/register/extraInfo");
    },
  });
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
  const { data: provinces } = useFetchListOfProvinces();
  const { data: cities } = useFetchListOfCities(formik.values.province);
  const { data: branches } = useFetchListBranches(
    formik.values.province,
    branchSearchTerm
  );
  const handleClearAgentCode = () => {
    formik.setFieldValue("agent_code", "");
  };
  // this effect works as debouncer to prevent repetetive api calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formik.values.agent_code) {
        checkAgencyCode({ agent_code: formik.values.agent_code });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formik.values.agent_code, checkAgencyCode]);

  function handleProvinceChange(code: string | null): void {
    formik.setFieldValue("province", code);
    formik.setFieldValue("city_code", null);
    formik.setFieldValue("insurance_branch", null);
  }

  const handleAgentTypeChange = (agentType: AgentType): void => {
    agentType == AgentType.LEGAL
      ? setIsLegalFieldVisible(true)
      : setIsLegalFieldVisible(false);
  };
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <TextField
          fullWidth
          // placeholder={t("extraInfo.enter_agency_code")}
          label={t("extraInfo.agent_code")}
          name="agent_code"
          id="agent_code"
          value={formik.values.agent_code || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={validateError(formik.touched, formik.errors, "agent_code")}
          helperText={validateHelper(
            formik.touched,
            formik.errors,
            "agent_code"
          )}
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
        <Autocomplete
          fullWidth
          disablePortal
          onChange={(event, option) => handleProvinceChange(option?.code)}
          onBlur={formik.handleBlur}
          options={provinces?.data || []}
          getOptionLabel={(option) => option.translation}
          renderInput={(params) => (
            <TextField
              name="province"
              id="province"
              error={validateError(formik.touched, formik.errors, "province")}
              helperText={validateHelper(
                formik.touched,
                formik.errors,
                "province"
              )}
              {...params}
              label={t("extraInfo.province")}
            />
          )}
        />
        <Autocomplete
          fullWidth
          disablePortal
          onChange={(event, option) =>
            formik.setFieldValue("city_code", option?.code)
          }
          disabled={!formik.values.province}
          onBlur={formik.handleBlur}
          options={cities?.data || []}
          getOptionLabel={(option) => option.translation}
          renderInput={(params) => (
            <TextField
              name="city_code"
              id="city_code"
              error={validateError(formik.touched, formik.errors, "city_code")}
              helperText={validateHelper(
                formik.touched,
                formik.errors,
                "city_code"
              )}
              {...params}
              label={t("extraInfo.city")}
            />
          )}
        />
        <Autocomplete
          fullWidth
          disablePortal
          onChange={(event, option) =>
            formik.setFieldValue("insurance_branch", option?.code)
          }
          disabled={!formik.values.province}
          onBlur={formik.handleBlur}
          options={branches?.data || []}
          getOptionLabel={(option) => option.translation}
          renderInput={(params) => (
            <TextField
              name="insurance_branch"
              id="insurance_branch"
              error={validateError(
                formik.touched,
                formik.errors,
                "insurance_branch"
              )}
              helperText={validateHelper(
                formik.touched,
                formik.errors,
                "insurance_branch"
              )}
              onChange={(e) => setBranchSearchTerm(e.target.value)}
              {...params}
              label={t("extraInfo.insurance_branch")}
            />
          )}
        />
        <Grid
          container
          direction={"row-reverse"}
          width={"100%"}
          spacing={theme.spacing(2)}
        >
          <Grid size={{ xs: 3 }}>
            <TextField
              fullWidth
              // label={t("extraInfo.tempCode")}
              name="tempCode"
              id="tempCode"
              value={formik.values.tempCode || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={validateError(formik.touched, formik.errors, "tempCode")}
              helperText={validateHelper(
                formik.touched,
                formik.errors,
                "tempCode"
              )}
              slotProps={{
                htmlInput: {
                  dir: "ltr",
                },
              }}
              required
            ></TextField>
          </Grid>
          <Grid size={{ xs: 9 }}>
            <TextField
              fullWidth
              label={t("extraInfo.phoneNumber")}
              name="tempPhoneNumber"
              id="tempPhoneNumber"
              value={formik.values.tempPhoneNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={validateError(
                formik.touched,
                formik.errors,
                "tempPhoneNumber"
              )}
              helperText={validateHelper(
                formik.touched,
                formik.errors,
                "tempPhoneNumber"
              )}
              slotProps={{
                htmlInput: {
                  dir: "ltr",
                },
              }}
              required
            ></TextField>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <StyledFormLabel
            sx={{ marginInlineStart: theme.spacing(1.5) }}
            id="agency_type"
          >
            {t("extraInfo.agency_type")}
          </StyledFormLabel>
          <StyledRadioGroup
            row
            aria-labelledby="agency_type"
            name="agency_type_group"
            onChange={(e) => handleAgentTypeChange(e.target.value as AgentType)}
          >
            <StyledFormControlLabel
              value={AgentType.REAL}
              control={<StyledRadio />}
              label={t("extraInfo." + AgentType.REAL)}
            />
            <StyledFormControlLabel
              value={AgentType.LEGAL}
              control={<StyledRadio />}
              label={t("extraInfo." + AgentType.LEGAL)}
            />
          </StyledRadioGroup>
        </FormControl>
        {isLegalFieldVisible && (
          <TextField
            fullWidth
            label={t("extraInfo.agent_name")}
            name="agent_type"
            id="agent_type"
            value={formik.values.agency_type || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={validateError(formik.touched, formik.errors, "agency_type")}
            helperText={validateHelper(
              formik.touched,
              formik.errors,
              "agency_type"
            )}
            required
          ></TextField>
        )}
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
