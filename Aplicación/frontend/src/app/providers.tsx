import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
