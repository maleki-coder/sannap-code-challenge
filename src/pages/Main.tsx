import { Header } from "@components/index";
import { styled, Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    // padding: theme.spacing(3),
    // paddingTop : theme.spacing(5),
    width: "30rem",
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: "100%", // Width for medium screens and smaller
    },
    // height : '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
}));
export function Main() {
    return (
        <>
            <StyledBox
            >
                <Header />
            </StyledBox>
        </>
    );
}
