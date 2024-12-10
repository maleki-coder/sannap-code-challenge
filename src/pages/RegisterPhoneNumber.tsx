
import { styled, Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "30rem",
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    },
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
}));
export function RegisterPhoneNumber() {
    return (
        <>
            <StyledBox
            >
                <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
                    <h1>test</h1>
            </StyledBox>
        </>
    );
}
