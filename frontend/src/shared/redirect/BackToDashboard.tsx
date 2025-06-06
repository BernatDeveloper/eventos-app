import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const BackToDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()


  return (
    <button
      onClick={() => navigate(ROUTES.dashboard)}
      className="custom-button primary-button mb-[var(--spacing-lg)]"
    >
      <FaArrowLeft className="text-sm" />
      <span>{t('button.back_to_dashboard')}</span>
    </button>
  );

};

export default BackToDashboard;
