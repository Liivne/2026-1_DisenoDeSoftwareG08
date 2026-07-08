import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import CampaignListPage from "@/features/campaigns/pages/CampaignListPage";
import CreateCampaignPage from "@/features/campaigns/pages/CreateCampaignPage";
import AppointmentListPage from "@/features/appointments/pages/AppointmentListPage";
import CreateAppointmentPage from "@/features/appointments/pages/CreateAppointmentPage";
import VaccinationHistoryPage from "@/features/history/pages/VaccinationHistoryPage";
import NotificationsPage from "@/features/notifications/pages/NotificationsPage";
import EditCampaignPage from "@/features/campaigns/pages/EditCampaignPage";
import VaccineListPage from "@/features/vaccines/pages/VaccineListPage";
import UserListPage from "@/features/users/pages/UserListPage";
import HealthAgendaPage from "@/features/agenda/pages/HealthAgendaPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Administrador"]}
              />
            }
          >
            <Route path="/users" element={<UserListPage />} />
            <Route path="/campaigns" element={<CampaignListPage />} />
            <Route path="/campaigns/new" element={<CreateCampaignPage />} />
            <Route path="/campaigns/:id/edit" element={<EditCampaignPage />} />
            <Route path="/vaccines" element={<VaccineListPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Paciente"]}
              />
            }
          >
            <Route path="/appointments" element={<AppointmentListPage />} />
            <Route path="/appointments/new" element={<CreateAppointmentPage />} />
            <Route path="/history" element={<VaccinationHistoryPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["Personal de Salud"]}
              />
            }
          >
            <Route path="/agenda" element={<HealthAgendaPage />} />
          </Route>

          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}