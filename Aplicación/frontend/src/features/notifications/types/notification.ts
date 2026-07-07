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

export type NotificationFilter = "all" | "unread" | "important";