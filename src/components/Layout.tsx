import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLayoutStore } from "@store/useLayoutStore";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledBox = styled(Box)(({ theme }) => ({
    // padding: theme.spacing(3),
    // borderTopLeftRadius: "24px",
    // borderTopRightRadius: "24px",
    width: "100%",
    minHeight : '100vh',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper
}));
export function Layout() {
    const { onMobileViewChange } = useLayoutStore();
    const theme = useTheme();;

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        onMobileViewChange(isMobile);
    }, [isMobile]);
    return (
        <StyledBox
        >
            <CssBaseline />
            {/* <Header /> */}

            {/* <Main ismobile={isMobile}> */}
            <Outlet />
            {/* </Main> */}
        </StyledBox>
    );
}
