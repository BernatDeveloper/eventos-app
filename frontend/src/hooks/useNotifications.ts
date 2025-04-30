import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../services/notificationService";
import { Notification } from "../types/notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getAllNotifications();
      setNotifications(data.notifications);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    try {
      const data = await getUnreadNotifications();
      setNotifications(data.notifications);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      toast.success("Notificación marcada como leída.");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      toast.success("Todas las notificaciones marcadas como leídas.");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      toast.success("Notificación eliminada.");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications();
      toast.success("Todas las notificaciones eliminadas.");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    fetchUnreadNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleClearAll,
  };
};
