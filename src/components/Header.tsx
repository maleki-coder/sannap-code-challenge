import { styled } from "@mui/system";
import { useStepperStore } from "@store/useStepperStore";

interface StyledDivProps {
  currentstep: number;
}

const StyledDiv = styled("div")<StyledDivProps>(({ theme, currentstep }) => ({
  position: "absolute",
  top: theme.spacing(0),
  height: currentstep === 5 ? "100%" : theme.spacing(34),
  zIndex: 0,
  borderBottomLeftRadius: currentstep === 5 ? "0" : theme.spacing(3),
  borderBottomRightRadius: currentstep === 5 ? "0" : theme.spacing(3),
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette.customGreen.main,
  filter: currentstep === 5 ? "blur(2px)" : "none",
}));

const StyledImg = styled("img")(({ theme }) => ({
  top: theme.spacing(4),
  position: "absolute",
  width: theme.spacing(20),
  zIndex: 0,
}));

// Header component
export function Header() {
  const currentStep = useStepperStore((state) => state.currentStep);

  return (
    <StyledDiv currentstep={currentStep}>
      <StyledImg
        src="../src/assets/Day-Insurance-Company-Logo-.svg"
        alt="Decorative SVG"
      />
    </StyledDiv>
  );
}
