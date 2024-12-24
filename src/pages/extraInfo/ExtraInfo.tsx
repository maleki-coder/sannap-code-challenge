import { FormControl, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { StyledForm } from "@/pages/phoneNumber/index";
import {
  StyledFormControlLabel,
  StyledFormLabel,
  StyledRadio,
  StyledRadioGroup,
} from "@/pages/extraInfo/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { DayGreenLoadingButton, ValidatedTextField } from "@components/index";
import { useState } from "react";
import { AgentType, RepresentativeRegistration } from "@/models";
import { useSignUp } from "@hooks/useSignUp";
import AgencyCodeTextField from "./components/AgencyCodeTextField";
import ProvinceAutoComplete from "./components/ProvinceAutoComplete";
import CountyAutoComplete from "./components/CountyAutoComplete";
import { InsuranceBranchAutoComplete } from "./components/InsuranceBranchAutoComplete";
import useExtraInfoValidationSchema from "./validation/useExtraInfoValidationSchema";
import initialValues from "./initialValues";
import { showSnackbar, translateErrorMessage } from "@utils/index";
import { ErrorData } from "@infra/index";
import { AxiosError } from "axios";
export function ExtraInfo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { updateRepresentative, representative } = useRepresentativeStore();
  const { setCurrentStep } = useStepperStore();
  const [isAgencyCodeDuplicate, setIsAgencyCodeDuplicate] = useState<boolean>();
  const [isLegalFieldVisible, setIsLegalFieldVisible] = useState(false);
  const validationSchema = useExtraInfoValidationSchema(t);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      const { ...restValues } = formik.values;
      const { first_name, last_name, phone_number } = representative;
      signUp({
        ...restValues,
        address: "",
        first_name,
        last_name,
        phone_number,
      });
    },
  });
  const { isPending: isSignIpPending, mutate: signUp } = useSignUp({
    onSuccess: () => {
      updateRepresentative({ ...formik.values });
      setCurrentStep(5);
    },
    onError: (error: AxiosError<ErrorData>) => {
      showSnackbar(
        translateErrorMessage(
          error.response.data,
          error.response.data.error_details
            .attr as keyof RepresentativeRegistration
        ),
        {
          variant: "error",
        }
      );
    },
  });

  const handleIsAgencyCodeDuplicate = (isAgencyCodeDuplicate: boolean) => {
    setIsAgencyCodeDuplicate(isAgencyCodeDuplicate);
  };
  const handleAgentTypeChange = (agencyType: AgentType): void => {
    formik.setValues({
      ...formik.values,
      agency_type: agencyType,
      name: null,
    });
    setIsLegalFieldVisible(agencyType === AgentType.LEGAL);
  };
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <AgencyCodeTextField
          formik={formik}
          passIsAgencyCodeDuplicate={handleIsAgencyCodeDuplicate}
        />
        <ProvinceAutoComplete formik={formik} />
        <CountyAutoComplete formik={formik} />
        <InsuranceBranchAutoComplete formik={formik} />
        <Grid
          container
          direction={"row-reverse"}
          width={"100%"}
          spacing={theme.spacing(2)}
        >
          <Grid size={{ xs: 3 }}>
            <ValidatedTextField
              formik={formik}
              name="city_code"
              required
              fullWidth
              type="tel"
              id="city_code"
              dir={"ltr"}
            />
          </Grid>
          <Grid size={{ xs: 9 }}>
            <ValidatedTextField
              formik={formik}
              name="phone"
              translationLabel={t("extraInfo.phone")}
              required
              fullWidth
              type="tel"
              id="phone"
              dir={"ltr"}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <StyledFormLabel id="agency_type">
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
          <ValidatedTextField
            formik={formik}
            name="name"
            id="name"
            translationLabel={t("extraInfo.agent_name")}
            required
            fullWidth
          />
        )}
        <DayGreenLoadingButton
          fullWidth
          loading={isSignIpPending}
          type="submit"
          disabled={!formik.isValid || !formik.dirty || !isAgencyCodeDuplicate}
        >
          {t("general.signUp")}
        </DayGreenLoadingButton>
      </StyledForm>
    </>
  );
}
