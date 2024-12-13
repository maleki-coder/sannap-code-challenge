import { styled, Box } from "@mui/material";
import { useStepperStore } from "@store/index";
import { Outlet } from "react-router-dom";
interface StyledBoxProps {
  currentstep: number;
}
const StyledBox = styled(Box)<StyledBoxProps>(({ theme, currentstep }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  backgroundColor: theme.palette.common.white,
  width: "100%",
  top: currentstep === 5 ? 0 : theme.spacing(10),
  marginBottom: currentstep === 5 ? 0 : theme.spacing(10),
  height: "fit-content",
  borderRadius: theme.spacing(2),
  borderBottomLeftRadius: currentstep === 5 ? 0 : theme.spacing(2),
  borderBottomRightRadius: currentstep === 5 ? 0 : theme.spacing(2),
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
}));
export function RouteBody() {
   const currentStep = useStepperStore((state) => state.currentStep);
    return (
      <>
        <StyledBox currentstep={currentStep}>
          <Outlet />
        </StyledBox>
      </>
    );
}
