import { styled } from "@mui/material/styles";
import { RadioGroup } from "@mui/material";

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexWrap: "nowrap",
  paddingInlineStart: theme.spacing(2.5),
}));
