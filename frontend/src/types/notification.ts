export type Notification = {
    id: string;
    type: string;
    data: any;
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type NotificationResponse = {
    message: string;
    notifications: Notification[];
};