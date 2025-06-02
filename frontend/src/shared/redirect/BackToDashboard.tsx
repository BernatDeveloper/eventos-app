import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaArrowLeft } from "react-icons/fa";

const BackToDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.dashboard)}
      className="custom-button primary-button mb-[var(--spacing-lg)]"
    >
      <FaArrowLeft className="text-sm" />
      <span>Volver al Dashboard</span>
    </button>
  );

};

export default BackToDashboard;
