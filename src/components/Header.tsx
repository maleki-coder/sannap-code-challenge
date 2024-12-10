
import { styled } from "@mui/system";
const StyledDiv = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(0),
    height: "12rem",
    zIndex: 0,
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px",
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette['DayGreen'].main,
}));
const StyledImg = styled('img')(({ theme }) => ({
    top: theme.spacing(4),
    position: 'absolute',
    width: '8rem',
    zIndex : 0
}));
export function Header() {
    return (
        <StyledDiv>
            <StyledImg src="../src/assets/Day-Insurance-Company-Logo-.svg" alt="Decorative SVG" />
        </StyledDiv>
    );
}
