import type { Role } from "@/shared/types/role";

export type ApiRole =
  | "ADMINISTRADOR"
  | "PERSONAL_SALUD"
  | "PACIENTE";

export function mapApiRoleToFrontendRole(role: ApiRole): Role {
  switch (role) {
    case "ADMINISTRADOR":
      return "Administrador";
    case "PERSONAL_SALUD":
      return "Personal de Salud";
    case "PACIENTE":
      return "Paciente";
  }
}