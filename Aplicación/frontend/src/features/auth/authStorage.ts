import type { ApiRole } from "@/shared/utils/roleMapper";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";

export type AuthUser = {
  id: number;
  rut: string;
  name: string;
  email: string;
  phone: string | null;
  role: ApiRole;
};

const TOKEN_KEY = "vaccination.token";
const USER_KEY = "vaccination.user";

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  },

  setUser(user: AuthUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getRole() {
    const user = this.getUser();

    if (!user) {
      return null;
    }

    return mapApiRoleToFrontendRole(user.role);
  },

  getName() {
    return this.getUser()?.name ?? "";
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("vaccination.role");
    localStorage.removeItem("vaccination.name");
  },
};