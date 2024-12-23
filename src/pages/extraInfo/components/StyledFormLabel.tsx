import { styled } from "@mui/material/styles";
import { FormLabel } from "@mui/material";

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: theme.spacing(1.5),
  marginInlineStart: theme.spacing(1.5)
}));
