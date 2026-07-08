export type UserRole =
  | "PACIENTE"
  | "PERSONAL_SALUD"
  | "ADMINISTRADOR";

export interface User {
  id: number;
  rut: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
}