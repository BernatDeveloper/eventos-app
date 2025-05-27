import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { ROUTES } from "../../routes/routes";
import { useNotifications } from "../../hooks/useNotifications";
import { IoNotificationsOutline } from "react-icons/io5"

export const NotificationButton = () => {
    const navigate = useNavigate();
    const { fetchNotificationCount, fetchUnreadNotifications } = useNotifications();

    useEffect(() => {
        fetchNotificationCount();
        fetchUnreadNotifications();
    }, []);

    const unreadCount = useAppSelector((state) => state.notifications.notificationCount);

    const redirectToNotification = () => {
        navigate(ROUTES.notification);
    };

    return (
        <div
            className="relative cursor-pointer group"
            onClick={redirectToNotification}
            title="notifications"
        >
            <IoNotificationsOutline className="text-2xl transition duration-200 group-hover:animate-(--shake-animation)" />

            {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[var(--primary-color)] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </div>
    );
};
