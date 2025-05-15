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
      if (data.notifications) {
        dispatch(setNotifications(data.notifications));
      } else {
        dispatch(setReduxError("No se encontraron notificaciones."));
      }
    } catch (error: any) {
      dispatch(setReduxError("Error al obtener las notificaciones."));
    } finally {
      dispatch(setReduxLoading(false));
    }
  };

  // Función para obtener las notificaciones no leídas
  const fetchUnreadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getUnreadNotifications();
      if (data.notifications) {
        dispatch(setNotifications(data.notifications));
      } else {
        toast.error("No se encontraron notificaciones no leídas.");
      }
    } catch (error: any) {
      toast.error("Error al obtener las notificaciones no leídas.");
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
      toast.error("Error al obtener el contador de notificaciones.");
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
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    dispatch(setNotifications(updatedNotifications));

    try {
      const response = await deleteNotification(id);
      toast.success(response);

      fetchNotificationCount();
    } catch (error: any) {
      dispatch(setNotifications(notifications));
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
    notificationCount,
    fetchUnreadNotifications,
    fetchNotificationCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleClearAll,
  };
};
