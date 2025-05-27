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
  return (
    <div className="flex justify-between items-end">
      <p>Eliminado el día: {formatDate(notification.data.removed_at)}</p>
      <div className="mt-2">
        <button
          onClick={() => onDelete(notification.id)}
          className="custom-button reject-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
