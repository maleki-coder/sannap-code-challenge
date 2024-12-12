import { styled } from "@mui/material";
export const StyledPhoneNumberGrid = styled("div")(({ theme }) => ({
  width: "100%",
  display: "grid",
  flexWrap: "nowrap",
  gap: theme.spacing(2),
}));
