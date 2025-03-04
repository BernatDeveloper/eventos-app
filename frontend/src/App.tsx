import React, { useState, useEffect } from "react";
import "./styles/index.css";
import { login, logout, getUser } from "./services/authService";
import { getToken } from "./services/authService";


interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  user_type: "free" | "premium";
  role: "admin" | "moderator" | "user";
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();

      if (!token) {
        console.log("🚫 No hay token. Usuario no autenticado.");
        setUser(null);
        return;
      }

      try {
        setLoading(true);
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        console.error("❌ Error al obtener el usuario:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      await login("user@example.com", "password123");

      const userInfo = await getUser();

      if (!userInfo) {
        console.warn("⚠️ No se pudo obtener el usuario después del login.");
      }

      setUser(userInfo);
    } catch (err: any) {
      console.error("❌ Error en el login:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (err: any) {
      console.error("❌ Error en logout:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md w-96 text-center">
        <h2 className="text-lg font-bold">Auth Component</h2>

        {loading ? (
          <p className="mt-4">Cargando...</p>
        ) : user ? (
          <div className="mt-4">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* <p><strong>Imagen de perfil:</strong> <img src={user.profile_image} alt="Perfil" width="50" /></p> */}
            <p><strong>Tipo de usuario:</strong> {user.user_type}</p>
            <p><strong>Rol:</strong> {user.role}</p>

            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p>No estás autenticado</p>
            <button
              onClick={handleLogin}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Iniciar sesión
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default App;
