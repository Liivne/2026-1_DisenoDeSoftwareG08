import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AppShell from "@/shared/components/AppShell/AppShell";
import { sidebarConfig } from "@/shared/config/sidebarConfig";
import { roleOrder } from "@/shared/config/roles";
import type { Role } from "@/shared/types/role";

function getStoredRole(): Role {
  const role = localStorage.getItem("vaccination.role");

  return roleOrder.includes(role as Role)
    ? (role as Role)
    : "Paciente";
}

function getStoredName(role: Role): string {
  const storedName = localStorage.getItem("vaccination.name");

  if (storedName) {
    return storedName;
  }

  switch (role) {
    case "Administrador":
      return "Dra. Valeria Gómez";

    case "Personal de Salud":
      return "Dra. Laura Méndez";

    default:
      return "María Fernanda Ruiz";
  }
}

export default function AppLayout() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const role = useMemo(getStoredRole, []);

  const userName = useMemo(
    () => getStoredName(role),
    [role]
  );

  function handleLogout() {
    localStorage.removeItem("vaccination.role");
    localStorage.removeItem("vaccination.name");

    navigate("/login");
  }

  return (
    <AppShell
        role={role}
        userName={userName}
        menuItems={sidebarConfig[role]}
        drawerWidth={collapsed ? 96 : 288}
        collapsed={collapsed}
        onToggleCollapsed={() =>
            setCollapsed((value) => !value)
      }
      onLogout={handleLogout}
    >
      <Outlet />
    </AppShell>
  );
}