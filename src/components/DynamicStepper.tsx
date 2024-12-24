import { styled, Box } from "@mui/material";
import { useStepperStore } from "@store/index";
import {
  ExtraInfo,
  FullName,
  PhoneNumber,
  Successful,
  ValidateOtp,
} from "@/pages/index";

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

export const DynamicStepper = () => {
  const currentStep = useStepperStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PhoneNumber />;
      case 2:
        return <ValidateOtp />;
      case 3:
        return <FullName />;
      case 4:
        return <ExtraInfo />;
      case 5:
        return <Successful />;
      default:
        return <PhoneNumber />;
    }
  };

  return <StyledBox currentstep={currentStep}>{renderStep()}</StyledBox>;
};
