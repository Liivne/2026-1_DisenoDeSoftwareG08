import { useMemo, useState } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";
import NotificationFilters from "../components/NotificationFilters";
import type {
  Notification,
  NotificationFilter,
} from "../types/notification";

const notifications: Notification[] = [
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

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter(
        (notification) => notification.status === "unread",
      );
    }

    if (filter === "important") {
      return notifications.filter(
        (notification) =>
          notification.type === "warning" || notification.type === "error",
      );
    }

    return notifications;
  }, [filter]);

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
          color: "white",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <NotificationsOutlinedIcon sx={{ fontSize: 42 }} />

          <Stack spacing={0.5}>
            <Typography variant="h4" fontWeight={700}>
              Notificaciones
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Consulta avisos importantes, recordatorios y actualizaciones del
              sistema.
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <NotificationFilters
          value={filter}
          onChange={setFilter}
        />
      </Paper>

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          Resultados
        </Typography>

        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
          />
        ))}

        {filteredNotifications.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">
              No hay notificaciones para el filtro seleccionado.
            </Typography>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
}