import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaSignInAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const GoToAdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('profile')

  return (
    <button
      onClick={() => navigate(ROUTES.admin.dashboard)}
      className="custom-button primary-button"
    >
      <FaSignInAlt className="text-sm" />
      <span>{t('settings.label.admin_panel.button')}</span>
    </button>
  );
};
