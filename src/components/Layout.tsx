import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLayoutStore } from "@store/useLayoutStore";
import useMediaQuery from "@mui/material/useMediaQuery";
interface MainProps {
    ismobile: boolean;
}
const Main = styled("main", {
    shouldForwardProp: (prop) =>
        prop !== "ismobile",
})<MainProps>(({ theme }) => ({
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginInlineStart: theme.spacing(4),
    marginInlineEnd: theme.spacing(4),
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    position: "relative"
}));
export function Layout() {
    const { onMobileViewChange } = useLayoutStore();
    const theme = useTheme();;

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        onMobileViewChange(isMobile);
    }, [isMobile]);

    return (
        <Box
            sx={{
                display: "flex",
                overflowX: "hidden",
                backgroundColor: theme.palette["customGray"].dark,
            }}
        >
            <CssBaseline />
            <Header />

            {/* <Main ismobile={isMobile}> */}
            <Outlet />
            {/* </Main> */}
        </Box>
    );
}
