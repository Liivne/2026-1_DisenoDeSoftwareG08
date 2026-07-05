import { RoleDashboard } from "../types";
import { adminDashboard } from "../pages/roles/adminDashboard";
import { healthStaffDashboard } from "../pages/roles/healthStaffDashboard";
import { patientDashboard } from "../pages/roles/patientDashboard";
import type { Role } from "@/shared/types/role";

export const dashboardsByRole: Record<Role, RoleDashboard> = {
  Administrador: adminDashboard,
  "Personal de Salud": healthStaffDashboard,
  Paciente: patientDashboard,
};