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
    <div className="mt-4 text-sm text-gray-600">
      <p>Eliminado el día: {formatDate(notification.data.removed_at)}</p>
      <div className="mt-2">
        <button
          onClick={() => onDelete(notification.id)}
          className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
