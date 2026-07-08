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