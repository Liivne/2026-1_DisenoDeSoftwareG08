import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";
import type { Role } from "@/shared/types/role";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const role = mapApiRoleToFrontendRole(user.role);

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}