import { useTranslation } from "react-i18next";
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
    const { t : tNoti} = useTranslation('notification')
    const { t : tGlobal} = useTranslation()

    return (
        <>
            <p className="font-medium">
                {tNoti('invitation.message', {
                    event: notification.data.event_title,
                    user: notification.data.inviter_name,
                })}
            </p>
            <div className="mt-4 p-3 bg-[var(--background-color)] rounded-md shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1 text-sm text-[var(--text-primary-color)] ">
                    <p>
                        <span className="font-medium text-[var(--text-muted-color)]">{tNoti('invitation.inviter')}</span>{" "}
                        {notification.data.inviter_name}
                    </p>
                    <p>
                        <span className="font-medium text-[var(--text-muted-color)]">{tNoti('invitation.invited_on')}</span>{" "}
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
                                className="custom-button accept-button"
                            >
                                {tGlobal('button.confirm')}
                            </button>
                            <button
                                onClick={() =>
                                    onReject(notification.data.invitation_id, notification.id)
                                }
                                className="custom-button reject-button"
                            >
                                {tGlobal('button.reject')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
