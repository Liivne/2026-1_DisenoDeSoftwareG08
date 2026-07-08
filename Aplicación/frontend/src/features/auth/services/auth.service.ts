import { apiFetch } from "@/app/api";

export interface LoginResponse {
  accessToken: string;

  user: {
    id: number;
    rut: string;
    name: string;
    email: string;
    phone: string | null;
    role: "ADMINISTRADOR" | "PERSONAL_SALUD" | "PACIENTE";
  };
}

export type RegisterPayload = {
  rut: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export async function register(data: RegisterPayload) {
  return apiFetch<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(
  email: string,
  password: string
) {
  return apiFetch<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
}