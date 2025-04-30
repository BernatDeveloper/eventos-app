export type Notification = {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: {
      invitation_id: number;
      event_id: string;
      event_title: string;
      inviter_name: string;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type NotificationResponse = {
    message: string;
    notifications: Notification[];
};