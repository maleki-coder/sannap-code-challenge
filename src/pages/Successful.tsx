import LoadingButton from "@mui/lab/LoadingButton";
import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRepresentativeStore, useStepperStore } from "@store/index";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export function Successful() {
  const { resetRepresentative } = useRepresentativeStore();
  const navigate = useNavigate();
  const { setCurrentStep, setAllowedStep } = useStepperStore();
  const theme = useTheme();
  const { t } = useTranslation();
  const routeToInitialPage = () => {
    resetRepresentative();
    navigate("/register/phonenumber");
    setCurrentStep(1);
    setAllowedStep(1);
  };
  return (
    <>
      <Grid container width={"100%"} gap={theme.spacing(2)}>
        <Grid size={{ xs: 12 }}>
          <Typography
            color={theme.palette["customBlack"].main}
            variant="subtitle2"
            fontWeight={600}
          >
            {t("successful.title")}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography
            color={theme.palette["customBlack"].main}
            variant="subtitle2"
            fontWeight={600}
          >
            {t("successful.message")}
          </Typography>
        </Grid>
        <LoadingButton
          fullWidth
          type="submit"
          variant="dayGreen"
          onClick={routeToInitialPage}
        >
          {t("general.another_account")}
        </LoadingButton>
      </Grid>
    </>
  );
}
