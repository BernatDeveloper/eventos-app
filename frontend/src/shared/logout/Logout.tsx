import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";

export const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.home);
    };

    return (
        <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Cerrar sesión
        </button>
    )
}
