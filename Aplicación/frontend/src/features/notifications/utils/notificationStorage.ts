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
