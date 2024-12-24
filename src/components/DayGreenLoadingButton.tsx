import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

export const DayGreenLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.customGreen.main,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.customGreen.main 
  },
}));
