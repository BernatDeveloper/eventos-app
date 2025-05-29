import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaSignInAlt } from "react-icons/fa";

export const GoToAdminPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.admin.dashboard)}
      className="custom-button primary-button"
    >
      <FaSignInAlt className="text-sm" />
      <span>Ir al Panel de Admin</span>
    </button>
  );
};
