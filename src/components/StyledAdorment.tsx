import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

const CustomInputAdornment = styled(InputAdornment)(({ position }) => ({
  cursor: "pointer",
  ...(position === "start" && {
    paddingRight: "6px",
  }),
  ...(position === "end" && {
    height: "24px",
  }),
}));

interface CustomAdormentProps
  extends React.ComponentProps<typeof InputAdornment> {}

export const StyledAdorment = ({ ...props }: CustomAdormentProps) => {
  return (
    <CustomInputAdornment {...props}>{props.children}</CustomInputAdornment>
  );
};
