import { useMemo } from "react";

import AdminDashboard from "./roles/AdminDashboard";
import HealthStaffDashboard from "./roles/HealthStaffDashboard";
import PatientDashboard from "./roles/PatientDashboard";

import { roleOrder } from "@/shared/config/roles";
import { Role } from "@/shared/types/role";

function getStoredRole(): Role {
  const role = localStorage.getItem("vaccination.role");

  return roleOrder.includes(role as Role)
    ? (role as Role)
    : "Paciente";
}

export default function DashboardPage() {
  const role = useMemo(getStoredRole, []);

  switch (role) {
    case "Administrador":
      return <AdminDashboard />;

    case "Personal de Salud":
      return <HealthStaffDashboard />;

    case "Paciente":
      return <PatientDashboard />;

    default:
      return null;
  }
}