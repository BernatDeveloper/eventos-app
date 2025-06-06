import { useTranslation } from "react-i18next";
import { RemovedFromEventNotification } from "../../../../types/notification";
import { formatDate } from "../../../../utils/formatData";

interface RemovedFromEventNotificationProps {
  notification: RemovedFromEventNotification;
  onDelete: (notificationId: string) => Promise<void>;
}

export const RemovedFromEventNotificationComponent: React.FC<RemovedFromEventNotificationProps> = ({
  notification,
  onDelete,
}) => {
  const { t: tNoti } = useTranslation('notification')
  const { t: tGlobal } = useTranslation()
  console.log(notification)

  return (
    <>
      <p className="font-medium">
        {tNoti('removed.message', {
          event: notification.data.event_title,
        })}
      </p>
      <div className="flex justify-between items-end">
        <p>{tNoti('removed.removed_on')} {formatDate(notification.data.removed_at)}</p>
        <div className="mt-2">
          <button
            onClick={() => onDelete(notification.id)}
            className="custom-button reject-button"
          >
            {tGlobal('button.delete')}
          </button>
        </div>
      </div>
    </>
  );
};
