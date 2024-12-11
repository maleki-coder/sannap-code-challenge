import { styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

export const StyledNotiStack = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#2D7738",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#970C0C",
  },
}));
