import { useNotifications } from "../../../hooks/useNotifications";
import { useInvitations } from "../../../hooks/useInvitations";
import { Notification } from "../../../types/notification";

export const NotificationPage: React.FC = () => {
  const {
    notifications,
    loading,
    handleMarkAllAsRead,
    handleDeleteNotification,
  } = useNotifications();

  const {
    handleAcceptInvitation,
    handleRejectInvitation,
    fetchReceived,
  } = useInvitations();

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
          {notifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className="border p-4 rounded shadow-sm bg-gray-100"
            >
              <p className="font-medium">{notification.data.event_title}</p>
              <p className="text-sm text-gray-600">
                Inviter: {notification.data.inviter_name}
              </p>
              <p>{notification.data.invitation_id}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    handleAccept(notification.data.invitation_id, notification.id)
                  }
                  className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleReject(notification.data.invitation_id, notification.id)
                  }
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
