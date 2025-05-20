import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaArrowLeft } from "react-icons/fa";

const BackToLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.login)}
      className="ms-4 mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600
                 rounded-lg shadow-sm hover:bg-blue-50 hover:text-blue-800 hover:border-blue-700 transition
                 font-medium"
    >
      <FaArrowLeft className="text-sm" />
      <span>Volver al Login</span>
    </button>
  );
};

export default BackToLogin;
