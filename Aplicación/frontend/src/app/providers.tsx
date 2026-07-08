import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "./theme";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { SnackbarProvider } from "@/shared/context/SnackbarContext";
import { LoadingProvider } from "@/shared/context/LoadingContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SnackbarProvider>
          <LoadingProvider>
            <CssBaseline />
            {children}
          </LoadingProvider>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}