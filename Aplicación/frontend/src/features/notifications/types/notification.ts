export type NotificationStatus = "read" | "unread";

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error";

export type NotificationAudience =
  | "Todos"
  | "Administrador"
  | "Personal de Salud"
  | "Paciente";

export type NotificationRole =
  | "Administrador"
  | "Personal de Salud"
  | "Paciente";

export type Notification = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  status: NotificationStatus;
  type: NotificationType;
  audience: NotificationAudience;
};

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Cita confirmada",
    description: "Tu cita para la vacuna Influenza fue confirmada correctamente.",
    date: "Hoy",
    time: "09:30",
    status: "unread",
    type: "success",
    audience: "Paciente",
  },
  {
    id: 2,
    title: "Stock bajo",
    description: "El stock de vacuna Hepatitis B está bajo el mínimo recomendado.",
    date: "Hoy",
    time: "08:45",
    status: "unread",
    type: "error",
    audience: "Administrador",
  },
  {
    id: 3,
    title: "Campaña actualizada",
    description: "Se modificó la fecha de término de la campaña Influenza 2026.",
    date: "Ayer",
    time: "16:10",
    status: "read",
    type: "info",
    audience: "Todos",
  },
  {
    id: 4,
    title: "Pacientes pendientes",
    description: "Hay pacientes que aún no confirman su asistencia para hoy.",
    date: "Ayer",
    time: "11:20",
    status: "read",
    type: "warning",
    audience: "Personal de Salud",
  },
];

export type NotificationFilter = "all" | "unread" | "important";