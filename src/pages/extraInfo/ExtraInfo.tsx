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
import {
  RepresentativeRegistration,
  useRepresentativeStore,
  useStepperStore,
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
import { useSignUp } from "@hooks/useSignUp";
export function ExtraInfo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative, representative } = useRepresentativeStore();
    const { setCurrentStep, setAllowedStep } = useStepperStore();
  const [branchSearchTerm, setBranchSearchTerm] = useState("");
  const [isLegalFieldVisible, setIsLegalFieldVisible] = useState(false);
  const initialValues: Omit<
    RepresentativeRegistration,
    "first_name" | "last_name" | "phone_number"
  > = {
    agent_code: "",
    province: "",
    county_code: "",
    insurance_branch: "",
    agency_type: AgentType.REAL,
    city_code: "",
    phone: "",
    name: "",
  };
  const validationSchema = yup.object({
    agent_code: yup.string().required(t("extraInfo.agent_code_required")),
    province: yup.string().required(t("extraInfo.province_required")),
    county_code: yup.string().required(t("extraInfo.county_required")),
    city_code: yup.string().required(t("extraInfo.city_code_required")),
    insurance_branch: yup
      .string()
      .required(t("extraInfo.insurance_branch_required")),
    phone: yup.string().required(t("extraInfo.phone_required")),
    name: yup.string().when("agency_type", {
      is: "legal",
      then: (schema) => schema.required(t("extraInfo.agent_name_required")),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const { isPending : isSignIpPending , mutate: signUp } = useSignUp({
    onSuccess : () => {
      setCurrentStep(5);
      setAllowedStep(5);
    }
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      const { ...restValues } = formik.values;
      const { first_name, last_name, phone_number } = representative;
      signUp({
        ...restValues,
        first_name,
        last_name,
        phone_number,
      });
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
    formik.setValues({
      ...formik.values,
      province: code,
      county_code: null,
      insurance_branch: null,
    });
  }

  const handleAgentTypeChange = (agencyType: AgentType): void => {
    formik.setValues({
      ...formik.values,
      agency_type: agencyType,
      name: "",
    });
    setIsLegalFieldVisible(agencyType === AgentType.LEGAL);
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
              error={validateError(formik, "province")}
              helperText={validateHelper(formik, "province")}
              {...params}
              label={t("extraInfo.province")}
            />
          )}
        />
        <Autocomplete
          fullWidth
          disablePortal
          onChange={(event, option) =>
            formik.setFieldValue("county_code", option?.code)
          }
          disabled={!formik.values.province}
          onBlur={formik.handleBlur}
          options={cities?.data || []}
          getOptionLabel={(option) => option.translation}
          renderInput={(params) => (
            <TextField
              name="county_code"
              id="county_code"
              error={validateError(formik, "county_code")}
              helperText={validateHelper(formik, "county_code")}
              {...params}
              label={t("extraInfo.county")}
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
              error={validateError(formik, "insurance_branch")}
              helperText={validateHelper(formik, "insurance_branch")}
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
              name="city_code"
              id="city_code"
              type="tel"
              value={formik.values.city_code || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={validateError(formik, "city_code")}
              helperText={validateHelper(formik, "city_code")}
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
              label={t("extraInfo.phone")}
              name="phone"
              id="phone"
              type="tel"
              value={formik.values.phone || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={validateError(formik, "phone")}
              helperText={validateHelper(formik, "phone")}
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
            value={formik.values.agency_type}
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
            name="name"
            id="name"
            value={formik.values.name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={validateError(formik, "name")}
            helperText={validateHelper(formik, "name")}
            required
          ></TextField>
        )}
        <LoadingButton
          fullWidth
          loading={isSignIpPending}
          type="submit"
          disabled={!formik.isValid || !formik.dirty || !isAgencyCodeDuplicate}
          variant="dayGreen"
        >
          {t("general.signUp")}
        </LoadingButton>
      </StyledForm>
    </>
  );
}
