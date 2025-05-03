export type InvitationNotification = {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: {
      invitation_id: number;
      event_id: string;
      event_title: string;
      inviter_name: string;
      message: string
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type RemovedFromEventNotification = {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: {
      event_id: string;
      event_title: string;
      message: string;
      removed_at: string
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type NotificationResponse = {
    message: string;
    notifications: InvitationNotification[] | RemovedFromEventNotification[];
};