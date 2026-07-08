import { useMemo, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import AppShell from "@/shared/components/AppShell/AppShell";
import { sidebarConfig } from "@/shared/config/sidebarConfig";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useSnackbar } from "@/shared/context/SnackbarContext";

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { showInfo } = useSnackbar();

  const [collapsed, setCollapsed] = useState(false);

  const role = useMemo(() => {
    if (!user) return null;

    return mapApiRoleToFrontendRole(user.role);
  }, [user]);

  function handleLogout() {
    logout();
    showInfo("Sesión cerrada correctamente.");
    navigate("/login");
  }

  if (!isAuthenticated || !user || !role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell
      role={role}
      userName={user.name}
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