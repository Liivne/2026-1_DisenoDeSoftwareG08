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
import EditProfilePage from "@/features/profile/pages/EditProfilePage";

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
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
          path="/campaigns"
          element={<CampaignListPage />}
        />
        <Route
          path="/campaigns/new"
          element={<CreateCampaignPage />}
        />
        <Route
          path="/appointments"
          element={<AppointmentListPage />}
        />
        <Route
          path="/appointments/new"
          element={<CreateAppointmentPage />}
        />
        <Route
          path="/history"
          element={<VaccinationHistoryPage />}
        />
        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />
        <Route
          path="/campaigns/:id/edit"
          element={<EditCampaignPage />}
        />
        <Route
          path="/profile/edit"
          element={<EditProfilePage />}
        />
      </Route>
    </Routes>
  );
}