import { login, getToken } from "../../services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard"); // Redirigir si ya está autenticado
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await login("user@example.com", "password123");
      navigate("/dashboard"); // Redirigir tras iniciar sesión
    } catch (err: any) {
      console.error("❌ Error en el login:", err);
      setError("Error al iniciar sesión");
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
        ) : (
          <div className="mt-4">
            <p>No estás autenticado</p>
            <button onClick={handleLogin} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
              Iniciar sesión
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};
