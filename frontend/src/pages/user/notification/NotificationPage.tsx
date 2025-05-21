import { useNotifications } from "../../../hooks/useNotifications";
import { useInvitations } from "../../../hooks/useInvitations";
import { InvitationNotification, RemovedFromEventNotification } from "../../../types/notification";
import { InvitationNotificationComponent } from "./component/InvitationNotificationComponent";
import { RemovedFromEventNotificationComponent } from "./component/RemovedFromEventNotificationComponent";
import BackToDashboard from "../../../shared/redirect/BackToDashboard";
import { Loader } from "../../../shared/loader/Loader";
import { useState } from "react";
import { setEventsLoaded } from "../../../store/slices/eventSlice";
import { deleteNotification } from "../../../store/slices/notificationSlice";
import { useAppDispatch } from "../../../hooks/store";

export const NotificationPage: React.FC = () => {
  const { notifications, loading, handleDeleteNotification } = useNotifications();
  const { handleAcceptInvitation, handleRejectInvitation } = useInvitations();
  const [loadingNotificationId, setLoadingNotificationId] = useState<string | null>(null);
  const dispatch = useAppDispatch()

  const handleAccept = async (invitationId: number, notificationId: string) => {
    setLoadingNotificationId(notificationId);
    try {
      await handleAcceptInvitation(invitationId);
      await handleDeleteNotification(notificationId);

      dispatch(setEventsLoaded(false));
    } catch (error) {
      try {
        await handleDeleteNotification(notificationId);
      } catch (deleteErr) {
        console.error("Error deleting notification:", deleteErr);
      }
    } finally {
      setLoadingNotificationId(null);
    }
  };

  const handleReject = async (invitationId: number, notificationId: string) => {
    setLoadingNotificationId(notificationId);
    try {
      await handleRejectInvitation(invitationId);
      dispatch(deleteNotification(notificationId));
    } catch (err) {
      // Error ya gestionado dentro de handleRejectInvitation
    } finally {
      setLoadingNotificationId(null);
    }
  };

  const handleDelete = async (notificationId: string) => {
    await handleDeleteNotification(notificationId);
  };

  return (
    <>
      <BackToDashboard />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        {loading ? (
          <Loader />
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
                    isLoading={loadingNotificationId === notification.id}
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
    </>
  );
};
