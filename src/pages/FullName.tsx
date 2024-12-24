import { StyledForm } from "@/pages/phoneNumber/index";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { RepresentativeRegistration } from "@/models/index";
import { DayGreenLoadingButton, ValidatedTextField } from "@components/index";
export function FullName() {
  const { t } = useTranslation();
  const { updateRepresentative } = useRepresentativeStore();
  const { setCurrentStep } = useStepperStore();
  const initialValues: Pick<
    RepresentativeRegistration,
    "first_name" | "last_name"
  > = {
    first_name: null,
    last_name: null,
  };
  const validationSchema = yup.object({
    first_name: yup.string().required(t("fullName.firstName_required")),
    last_name: yup.string().required(t("fullName.lastName_required")),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      updateRepresentative({
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
      });
      setCurrentStep(4);
    },
  });
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} noValidate autoComplete="on">
        <ValidatedTextField
          formik={formik}
          translationLabel={t("fullName.first_name")}
          name="first_name"
          id="first_name"
          required
          fullWidth
        />
        <ValidatedTextField
          formik={formik}
          translationLabel={t("fullName.last_name")}
          name="last_name"
          id="last_name"
          required
          fullWidth
        />
        <DayGreenLoadingButton
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
