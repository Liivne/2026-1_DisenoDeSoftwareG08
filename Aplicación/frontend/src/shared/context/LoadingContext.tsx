import {
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LoadingContextValue = {
  showLoader: () => void;
  hideLoader: () => void;
};

const LoadingContext =
  createContext<LoadingContextValue | null>(null);

export function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({
      showLoader: () => setLoading(true),
      hideLoader: () => setLoading(false),
    }),
    []
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}

      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(
      "useLoading debe usarse dentro de LoadingProvider."
    );
  }

  return context;
}