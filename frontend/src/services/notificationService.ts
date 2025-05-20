import { CountResponse } from "../types/global";
import { NotificationResponse } from "../types/notification";
import api from "./api";

// Get all notifications
export const getAllNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await api.get<NotificationResponse>("/notifications");
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Get unread notification count
export const getNotificationCount = async (): Promise<CountResponse> => {
    try {
        const response = await api.get<CountResponse>("/notifications/count");
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Get unreaded notifications
export const getUnreadNotifications = async (): Promise<NotificationResponse> => {
    try {
        const response = await api.get<NotificationResponse>("/notifications/unread");
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Mark notification as read
export const markNotificationAsRead = async (id: string): Promise<string> => {
    try {
        const response = await api.put(`/notifications/${id}/mark-as-read`);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Marck all notifications as read
export const markAllNotificationsAsRead = async (): Promise<string> => {
    try {
        const response = await api.put("/notifications/mark-all-as-read");
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Delete notification
export const deleteNotification = async (id: string): Promise<string> => {
    try {
        const response = await api.delete(`/notifications/${id}`);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Delete all notifications
export const clearAllNotifications = async (): Promise<string> => {
    try {
        const response = await api.delete("/notifications/clear");
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
