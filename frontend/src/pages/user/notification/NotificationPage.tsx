import { useNotifications } from "../../../hooks/useNotifications";
import { useInvitations } from "../../../hooks/useInvitations";
import { InvitationNotification, RemovedFromEventNotification } from "../../../types/notification";
import { InvitationNotificationComponent } from "./component/InvitationNotificationComponent";
import { RemovedFromEventNotificationComponent } from "./component/RemovedFromEventNotificationComponent";

export const NotificationPage: React.FC = () => {
  const { notifications, loading, handleDeleteNotification } = useNotifications();
  const { handleAcceptInvitation, handleRejectInvitation, fetchReceived } = useInvitations();

  const handleAccept = async (invitationId: number, notificationId: string) => {
    await handleAcceptInvitation(invitationId);
    await fetchReceived();
    await handleDeleteNotification(notificationId);
  };

  const handleReject = async (invitationId: number, notificationId: string) => {
    await handleRejectInvitation(invitationId);
    await fetchReceived();
    await handleDeleteNotification(notificationId);
  };

  const handleDelete = async (notificationId: string) => {
    await handleDeleteNotification(notificationId);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="border p-4 rounded shadow-sm bg-gray-100"
            >
              <p className="font-medium">{notification.data.message}</p>

              {notification.type.includes("EventInvitationNotification") && (
                <InvitationNotificationComponent
                  notification={notification as InvitationNotification}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              )}

              {notification.type.includes("RemovedFromEvent") && (
                <RemovedFromEventNotificationComponent
                  notification={notification as RemovedFromEventNotification}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
