import { useAuth } from "../../hooks/useAuth";

export const Logout = () => {
    const { logout } = useAuth();


    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="reject-button custom-button "
        >
            Cerrar sesión
        </button>
    )
}
