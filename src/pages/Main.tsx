import { Header, RouteBody } from "@components/index";
import { styled, Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    width: "30rem",
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    },
    zIndex : 1, 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}));
export function Main() {
    return (
        <>
            <StyledBox
            >
                <Header />
                <RouteBody/>
            </StyledBox>
        </>
    );
}
