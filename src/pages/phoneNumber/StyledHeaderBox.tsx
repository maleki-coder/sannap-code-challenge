import { styled, Box } from "@mui/material";
export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  width: "30rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
}));
