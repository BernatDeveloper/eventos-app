import { ROUTES } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

export const NotificationButton = () => {
    const navigate = useNavigate();
    const { unreadCount } = useNotifications();

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
