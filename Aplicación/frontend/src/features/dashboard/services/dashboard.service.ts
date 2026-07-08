import { apiFetch } from "@/app/api";

export interface DashboardSummary {
  users: number;
  campaigns: number;
  activeCampaigns: number;
  vaccines: number;
  vaccinationPoints: number;
  appointments: number;
  completedAppointments: number;
  vaccinationRecords: number;
}

export function getDashboardSummary() {
  return apiFetch<DashboardSummary>("/dashboard/summary");
}