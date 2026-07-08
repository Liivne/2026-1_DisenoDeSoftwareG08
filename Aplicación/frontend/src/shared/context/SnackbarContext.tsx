import {
  Alert,
  Snackbar,
  type AlertColor,
} from "@mui/material";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

type SnackbarContextValue = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
};

const SnackbarContext =
  createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [snackbar, setSnackbar] =
    useState<SnackbarState>({
      open: false,
      message: "",
      severity: "info",
    });

  function showSnackbar(
    message: string,
    severity: AlertColor
  ) {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }

  function handleClose() {
    setSnackbar((current) => ({
      ...current,
      open: false,
    }));
  }

  const value = useMemo(
    () => ({
      showSuccess: (message: string) =>
        showSnackbar(message, "success"),
      showError: (message: string) =>
        showSnackbar(message, "error"),
      showInfo: (message: string) =>
        showSnackbar(message, "info"),
      showWarning: (message: string) =>
        showSnackbar(message, "warning"),
    }),
    []
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "useSnackbar debe usarse dentro de SnackbarProvider."
    );
  }

  return context;
}