import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const BackToDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.dashboard)}
      className="flex items-center gap-2 text-blue-600 hover:underline hover:text-blue-800 transition-colors"
    >
      ⬅
      <span>Back to Dashboard</span>
    </button>
  );
};

export default BackToDashboard;
