import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette["customGray"].light
}));
export function Layout() {
    return (
        <StyledBox
        >
            <CssBaseline />
            <Outlet />
        </StyledBox>
    );
}
