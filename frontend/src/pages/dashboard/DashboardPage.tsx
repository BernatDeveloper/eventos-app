import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../../services/authService";
import defaultUserImage from "../../assets/images/default-user.webp";

interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string;
    user_type: "free" | "premium";
    role: "admin" | "moderator" | "user";
}

export const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                console.log(userData)
                setUser(userData);
            } catch (err) {
                console.error("❌ Error al obtener el usuario:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login"); // Redirige al login después de cerrar sesión
        } catch (err: any) {
            console.error("❌ Error en logout:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 dark:text-gray-300">Cargando...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">No se pudo cargar la información del usuario.</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Perfil de Usuario</h2>
            <div className="flex flex-col items-center">
                <img
                    src={user.profile_image || defaultUserImage}
                    alt="Perfil"
                    className="w-20 h-20 rounded-full shadow-md border border-gray-300"
                />
                <p className="text-lg font-semibold mt-3 text-gray-900 dark:text-gray-200">{user.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-300"><strong>Tipo de usuario:</strong> {user.user_type}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Rol:</strong> {user.role}</p>
            </div>
            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md w-full transition duration-200"
            >
                Cerrar sesión
            </button>
        </div>
    );
};
