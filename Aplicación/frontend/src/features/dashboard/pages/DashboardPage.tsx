import AdminDashboard from "./roles/adminDashboard";
import HealthStaffDashboard from "./roles/healthStaffDashboard";
import PatientDashboard from "./roles/patientDashboard";

import { useAuth } from "@/features/auth/context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const role = mapApiRoleToFrontendRole(user.role);

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