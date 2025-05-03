import { InvitationNotification } from "../../../../types/notification";
import { formatDate } from "../../../../utils/formatData";

interface InvitationNotificationProps {
    notification: InvitationNotification;
    onAccept: (invitationId: number, notificationId: string) => Promise<void>;
    onReject: (invitationId: number, notificationId: string) => Promise<void>;
}

export const InvitationNotificationComponent: React.FC<InvitationNotificationProps> = ({
    notification,
    onAccept,
    onReject,
}) => {
    return (
        <div>
            <p className="text-sm text-gray-600">Inviter: {notification.data.inviter_name}</p>
            <p className="text-sm text-gray-600">Invitado el día: {formatDate(notification.created_at)}</p>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => onAccept(notification.data.invitation_id, notification.id)}
                    className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                    Accept
                </button>
                <button
                    onClick={() => onReject(notification.data.invitation_id, notification.id)}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    Reject
                </button>
            </div>
        </div>
    );
};
