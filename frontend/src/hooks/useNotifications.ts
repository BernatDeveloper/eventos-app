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
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  setNotifications,
  setLoading as setReduxLoading,
  setError as setReduxError,
  setNotificationCount,
  deleteNotification as deleteReduxNotification
} from "../store/slices/notificationSlice";

export const useNotifications = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { notifications, notificationCount, loaded } = useAppSelector((state) => state.notifications);

  // Función para obtener todas las notificaciones
  const fetchNotifications = async () => {
    if (loaded) return;

    dispatch(setReduxLoading(true));
    try {
      const data = await getAllNotifications();
      dispatch(setNotifications(data.notifications));
    } catch (error: any) {
      dispatch(setReduxError(error.message));
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // Función para obtener las notificaciones no leídas
  const fetchUnreadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getUnreadNotifications();
      dispatch(setNotifications(data.notifications));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el contador de notificaciones no leídas
  const fetchNotificationCount = async () => {
    try {
      const data = await getNotificationCount();
      dispatch(setNotificationCount(data.count));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await markNotificationAsRead(id);
      toast.success(response);
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
    const previousNotifications = [...notifications];

    dispatch(deleteReduxNotification(id));
    dispatch(setNotificationCount(notificationCount - 1));

    try {
      const response = await deleteNotification(id);
      toast.success(response);
    } catch (error: any) {
      dispatch(setNotifications(previousNotifications));
      dispatch(setNotificationCount(notificationCount));
      toast.error(error.message || "Error deleting notification");
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
    notificationCount,
    fetchUnreadNotifications,
    fetchNotificationCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleClearAll,
  };
};
