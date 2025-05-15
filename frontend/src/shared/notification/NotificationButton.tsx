import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { ROUTES } from '../../routes/routes';
import { useNotifications } from '../../hooks/useNotifications';
import { useEffect } from 'react';

export const NotificationButton = () => {
    const navigate = useNavigate();
    const { fetchNotificationCount } = useNotifications()

    useEffect(() => {
        fetchNotificationCount();
    }, []);

    // Accede al contador de notificaciones no leídas desde el store de Redux
    const unreadCount = useAppSelector((state) => state.notifications.notificationCount);

    const redirectToNotification = () => {
        navigate(ROUTES.notification);
    };

    return (
        <button
            onClick={redirectToNotification}
            className="relative text-white px-4 py-2 rounded-lg border border-blue-300 bg-blue-100/20 hover:bg-blue-100 transition duration-200"
        >
            🔔

            {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                </span>
            )}
        </button>
    );
};
