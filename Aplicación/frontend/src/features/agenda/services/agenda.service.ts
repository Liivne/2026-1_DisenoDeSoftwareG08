import { apiFetch } from "@/app/api";
import type { Appointment } from "@/features/appointments/types/appointment";

export function getAppointments() {
  return apiFetch<Appointment[]>("/appointments");
}

export function confirmAppointment(id: number) {
  return apiFetch<Appointment>(`/appointments/${id}/confirm`, {
    method: "PATCH",
  });
}

export function startAppointment(id: number) {
  return apiFetch<Appointment>(`/appointments/${id}/start`, {
    method: "PATCH",
  });
}

export function completeAppointment(id: number) {
  return apiFetch<Appointment>(`/appointments/${id}/complete`, {
    method: "PATCH",
  });
}

export function markNoShowAppointment(id: number) {
  return apiFetch<Appointment>(`/appointments/${id}/no-show`, {
    method: "PATCH",
  });
}