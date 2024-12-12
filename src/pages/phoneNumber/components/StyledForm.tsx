import { styled } from "@mui/material";
export const StyledForm = styled('form')(({ theme }) => ({
  width : "100%",
  marginTop : theme.spacing(3),
  display : 'flex',
  flexWrap : 'wrap',
  gap : theme.spacing(4)
}));
