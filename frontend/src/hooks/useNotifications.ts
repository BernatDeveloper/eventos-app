import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  getNotificationCount,
} from "../services/notificationService";
import { InvitationNotification, RemovedFromEventNotification } from "../types/notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<(InvitationNotification | RemovedFromEventNotification)[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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

  const fetchNotificationCount = async () => {
    try {
      const data = await getNotificationCount();
      setUnreadCount(data.count);
    } catch (error: any) {
      toast.error(error.message);
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
      const respone = await markNotificationAsRead(id);
      toast.success(respone);
      fetchNotifications();
      fetchNotificationCount();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await markAllNotificationsAsRead();
      toast.success(response);
      fetchNotifications();
      fetchNotificationCount();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await deleteNotification(id);
      toast.success(response);
      fetchNotifications();
      fetchNotificationCount();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await clearAllNotifications();
      toast.success(response);
      fetchNotifications();
      fetchNotificationCount();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchNotificationCount();
  }, []);

  return {
    notifications,
    loading,
    unreadCount,
    fetchUnreadNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleClearAll,
  };
};
