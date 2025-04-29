import { NotificationResponse } from "../types/notification";
import api from "./api";

// Get all notifications
export const getAllNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await api.get<NotificationResponse>("/notifications");
        return response.data;
    } catch (error: any) {
        throw new Error("Error al obtener las notificaciones.");
    }
};

// Get unreaded notifications
export const getUnreadNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await api.get<NotificationResponse>("/notifications/unread");
        return response.data;
    } catch (error: any) {
        throw new Error("Error al obtener las notificaciones no leídas.");
    }
};

// Get read notifications
export const getReadNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await api.get<NotificationResponse>("/notifications/read");
        return response.data;
    } catch (error: any) {
        throw new Error("Error al obtener las notificaciones leídas.");
    }
};

// Mark notification as read
export const markNotificationAsRead = async (id: string): Promise<string> => {
    try {
        const response = await api.put(`/notifications/${id}/mark-as-read`);
        return response.data.message;
    } catch (error: any) {
        throw new Error("Error al marcar la notificación como leída.");
    }
};

// Marck all notifications as read
export const markAllNotificationsAsRead = async (): Promise<string> => {
    try {
        const response = await api.put("/notifications/mark-all-as-read");
        return response.data.message;
    } catch (error: any) {
        throw new Error("Error al marcar todas las notificaciones como leídas.");
    }
};

// Delete notification
export const deleteNotification = async (id: string): Promise<string> => {
    try {
        const response = await api.delete(`/notifications/${id}`);
        return response.data.message;
    } catch (error: any) {
        throw new Error("Error al eliminar la notificación.");
    }
};

// Delete all notifications
export const clearAllNotifications = async (): Promise<string> => {
    try {
        const response = await api.delete("/notifications/clear");
        return response.data.message;
    } catch (error: any) {
        throw new Error("Error al eliminar todas las notificaciones.");
    }
};
