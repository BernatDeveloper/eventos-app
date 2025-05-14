import { Loader } from "../../../../shared/loader/Loader";
import { InvitationNotification } from "../../../../types/notification";
import { formatDate } from "../../../../utils/formatData";

interface InvitationNotificationProps {
    notification: InvitationNotification;
    onAccept: (invitationId: number, notificationId: string) => Promise<void>;
    onReject: (invitationId: number, notificationId: string) => Promise<void>;
    isLoading: boolean;
}

export const InvitationNotificationComponent: React.FC<InvitationNotificationProps> = ({
    notification,
    onAccept,
    onReject,
    isLoading
}) => {
    return (
        <div className="mt-4 p-3 bg-white rounded-md shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 text-sm text-gray-700">
                <p>
                    <span className="font-medium text-gray-800">Inviter:</span>{" "}
                    {notification.data.inviter_name}
                </p>
                <p>
                    <span className="font-medium text-gray-800">Invited on:</span>{" "}
                    {formatDate(notification.created_at)}
                </p>
            </div>

            <div className="flex items-center justify-center min-w-[150px] h-[38px]">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                onAccept(notification.data.invitation_id, notification.id)
                            }
                            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() =>
                                onReject(notification.data.invitation_id, notification.id)
                            }
                            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition"
                        >
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
