import { Header, RouteBody } from "@components/index";
import { styled, Box } from "@mui/material";
import { useStepperStore } from "@store/index";
interface StyledBoxProps {
  currentstep: number;
}
const StyledBox = styled(Box)<StyledBoxProps>(({ theme, currentstep }) => ({
  padding: currentstep === 5 ? 0 : theme.spacing(4),
  width: "30rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  zIndex: 1,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: currentstep === 5 ? "end" : "start",
}));
export function Main() {
    const currentstep = useStepperStore((state) => state.currentStep);
    return (
      <>
        <StyledBox currentstep={currentstep}>
          <Header />
          <RouteBody />
        </StyledBox>
      </>
    );
}
