import { styled, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    paddingBottom : theme.spacing(4),
    backgroundColor : theme.palette.common.white,
    width: "100%",
    top : theme.spacing(10),
    marginBottom : theme.spacing(10),
    height :'fit-content',
    borderRadius : theme.spacing(2),
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
}));
export function RouteBody() {
    return (
      <>
        <StyledBox>
          <Outlet />
        </StyledBox>
      </>
    );
}
