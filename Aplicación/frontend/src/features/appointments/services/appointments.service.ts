import { apiFetch } from "@/app/api";
import type { Appointment } from "../types/appointment";

export type AppointmentCampaignOption = {
  id: number;
  name: string;
  vaccine: {
    id: number;
    name: string;
  };
};

export type VaccinationPointOption = {
  id: number;
  name: string;
  address: string;
  city: string | null;
  commune: string | null;
};

export function getMyAppointments() {
  return apiFetch<Appointment[]>("/appointments/my");
}

export function createAppointment(data: {
  campaignId: number;
  vaccinationPointId: number;
  appointmentDate: string;
}) {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function cancelAppointment(id: number) {
  return apiFetch<Appointment>(`/appointments/${id}/cancel`, {
    method: "PATCH",
  });
}

export function getAppointmentCampaigns() {
  return apiFetch<AppointmentCampaignOption[]>("/campaigns/active");
}

export function getVaccinationPoints() {
  return apiFetch<VaccinationPointOption[]>("/vaccination-points");
}