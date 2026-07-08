export type AppointmentStatus =
  | "PENDIENTE"
  | "CONFIRMADA"
  | "EN_PROCESO"
  | "COMPLETADA"
  | "CANCELADA"
  | "AUSENTE";

export interface Appointment {
  id: number;
  date: string;
  status: AppointmentStatus;
  campaign: string;
  vaccine: string;
  vaccinationPoint: string;
  address: string;
}