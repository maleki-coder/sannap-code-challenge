import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

const CustomInputAdornment = styled(InputAdornment)(({ theme, position }) => ({
  cursor: "pointer",
  ...(position === "start" && {
    // borderRight: `1px ${theme.palette["customGray"].main} solid`,
    paddingRight: "6px",
  }),
  ...(position === "end" && {
    // borderLeft: `1px ${theme.palette["customGray"].main} solid`,
    // paddingLeft: "6px",
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
