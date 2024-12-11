import "@infra/theme/font.css";

import CssBaseline from "@mui/material/CssBaseline";
import { MUIWrapper } from "@infra/index";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes/Routes";
import { InitSnackbar } from "@utils/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyledNotiStack } from "@components/index";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MUIWrapper>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={5}
          Components={{
            success: StyledNotiStack,
            error: StyledNotiStack,
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          classes={{
            containerRoot: "text-right",
          }}
          dense={true}
        >
          <InitSnackbar />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </MUIWrapper>
    </QueryClientProvider>
  </StrictMode>
);
