import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { HiOutlineStar } from "react-icons/hi2";

export const GoToPremiumPlan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.premiumPlan)}
      className="custom-button primary-button"
    >
      <HiOutlineStar className="text-base" />
      <span className="ml-1">Premium</span>
    </button>
  );
};
