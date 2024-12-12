import { styled } from "@mui/material/styles";
import { FormControlLabel } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  flex: "0 0 50%",
  maxWidth: "50%",
  "& .MuiFormControlLabel-label": {
    fontSize: theme.spacing(1.5),
  },
}));
