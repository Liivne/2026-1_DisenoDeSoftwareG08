import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authStorage, type AuthUser } from "../authStorage";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginUser: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    authStorage.getUser()
  );

  const isAuthenticated = !!authStorage.getToken() && !!user;

  function loginUser(token: string, user: AuthUser) {
    authStorage.setToken(token);
    authStorage.setUser(user);
    setUser(user);
  }

  function logout() {
    authStorage.logout();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loginUser,
      logout,
    }),
    [user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }

  return context;
}