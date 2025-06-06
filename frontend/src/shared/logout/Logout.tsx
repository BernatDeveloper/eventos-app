import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

export const Logout = () => {
    const { logout } = useAuth();
    const { t } = useTranslation('profile')

    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="reject-button custom-button "
        >
            {t('settings.label.close_session.title')}
        </button>
    )
}
