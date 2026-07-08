import { useEffect, useMemo, useState } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import {
  Paper,
  Stack,
  Typography,
  Button
} from "@mui/material";

import { useAuth } from "@/features/auth/context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";
import NotificationCard from "../components/NotificationCard";
import NotificationFilters from "../components/NotificationFilters";
import type {
  Notification,
  NotificationFilter,
  NotificationRole,
} from "../types/notification";
import {
  getUnreadCountForRole,
  readStoredNotifications,
  writeStoredNotifications,
  dispatchAndEmailNotification
} from "../utils/notificationStorage";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [notifications, setNotifications] = useState<Notification[]>(() => readStoredNotifications());

  const currentRole = useMemo<NotificationRole | null>(() => {
    if (!user?.role) return null;
    return mapApiRoleToFrontendRole(user.role) as NotificationRole;
  }, [user?.role]);

  useEffect(() => {
    writeStoredNotifications(notifications);
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    const roleScopedNotifications = notifications.filter((notification) => {
      if (notification.audience === "Todos") return true;
      if (!currentRole) return false;

      return notification.audience === currentRole;
    });

    if (filter === "unread") {
      return roleScopedNotifications.filter(
        (notification) => notification.status === "unread",
      );
    }

    if (filter === "important") {
      return roleScopedNotifications.filter(
        (notification) =>
          notification.type === "warning" || notification.type === "error",
      );
    }

    return roleScopedNotifications;
  }, [currentRole, filter, notifications]);

  const unreadCount = useMemo(() => {
    return getUnreadCountForRole(notifications, currentRole);
  }, [currentRole, notifications]);

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification,
      ),
    );
  };

  const handleSimulateNotification = () => {
    if (!user) return;
    dispatchAndEmailNotification(user.email, user.name, {
      title: "Prueba de Integración Brevo",
      description: "Esta es una notificación de prueba que llega a tu correo.",
      type: "info",
      audience: "Todos"
    });
  };

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
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
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

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSimulateNotification}
            sx={{ fontWeight: "bold", bgcolor: "white", color: "#1565C0", '&:hover': { bgcolor: "#f0f0f0" } }}
          >
            + Simular Notificación
          </Button>
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            Resultados
          </Typography>

          {unreadCount > 0 && (
            <Typography variant="body2" color="primary" fontWeight={600}>
              {unreadCount} sin leer
            </Typography>
          )}
        </Stack>

        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markNotificationAsRead(notification.id)}
            style={{ cursor: "pointer" }}
          >
            <NotificationCard notification={notification} />
          </div>
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