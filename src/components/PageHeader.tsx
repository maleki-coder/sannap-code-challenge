import { Box, useTheme } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette["customGray"].main}`,
}));

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
    //   const theme = useTheme();
    return (
        <StyledBox>

        </StyledBox>
    );
};

export default PageHeader;
