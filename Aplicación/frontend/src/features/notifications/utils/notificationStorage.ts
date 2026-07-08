import type { Notification } from "../types/notification";
import { initialNotifications } from "../types/notification";

export const NOTIFICATIONS_STORAGE_KEY = "vaccination.notifications";

export function readStoredNotifications(): Notification[] {
  if (typeof window === "undefined") return initialNotifications;

  try {
    const stored = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!stored) return initialNotifications;

    return JSON.parse(stored) as Notification[];
  } catch {
    return initialNotifications;
  }
}

export function writeStoredNotifications(notifications: Notification[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  window.dispatchEvent(new Event("notifications:updated"));
}

export function getUnreadCountForRole(
  notifications: Notification[],
  currentRole: string | null,
) {
  return notifications.filter((notification) => {
    if (notification.status !== "unread") return false;
    if (notification.audience === "Todos") return true;
    if (!currentRole) return false;
    return notification.audience === currentRole;
  }).length;
}

export async function dispatchAndEmailNotification(
  userEmail: string,
  userName: string,
  notificationData: Omit<Notification, "id" | "status" | "date" | "time">
) {
  // 1. Agregarla a la lista local
  const currentNotifications = readStoredNotifications();
  const now = new Date();
  
  const newNotification: Notification = {
    ...notificationData,
    id: Math.max(0, ...currentNotifications.map(n => n.id)) + 1,
    status: "unread",
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const updatedNotifications = [newNotification, ...currentNotifications];
  writeStoredNotifications(updatedNotifications);

  // 2. Disparar el envío de correo a través del backend
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
    await fetch(`${API_URL}/notifications/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail,
        userName,
        title: notificationData.title,
        description: notificationData.description,
      }),
    });
  } catch (error) {
    console.error("Error al enviar la notificación por correo:", error);
  }
}
