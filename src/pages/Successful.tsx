import { DayGreenLoadingButton } from "@components/index";
import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { useTranslation } from "react-i18next";
export function Successful() {
  const { resetRepresentative } = useRepresentativeStore();
  const { setCurrentStep } = useStepperStore();
  const theme = useTheme();
  const { t } = useTranslation();
  const routeToInitialPage = () => {
    resetRepresentative();
    setCurrentStep(1);
  };
  return (
    <>
      <Grid container width={"100%"} gap={theme.spacing(2)}>
        <Grid size={{ xs: 12 }}>
          <Typography
            color={theme.palette.common.black}
            variant="subtitle2"
            fontWeight={600}
          >
            {t("successful.title")}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            color={theme.palette.common.black}
            variant="subtitle2"
            fontWeight={600}
          >
            {t("successful.message")}
          </Typography>
        </Grid>
        <DayGreenLoadingButton
          onClick={routeToInitialPage}
          fullWidth
          type="submit"
        >
          {t("general.another_account")}
        </DayGreenLoadingButton>
      </Grid>
    </>
  );
}
