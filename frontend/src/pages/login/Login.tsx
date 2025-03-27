import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { setToken, setUserId, getToken } from "../../services/authService"; // Importa las funciones necesarias

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Llamada a login, asegurándose de que el backend devuelva el token y el id
      const response = await login(email, password);

      // Asumimos que el backend devuelve el token y el objeto user completo
      const { token, user } = response;

      // Accedemos al userId desde el objeto user
      const userId = user?.id;

      if (!token || !userId) {
        throw new Error("No se encontró el token o el ID. Inicia sesión nuevamente.");
      }

      // Almacenar el token y el id en el localStorage usando las funciones
      setToken(token);
      setUserId(userId);

      // Verificar si se ha guardado el token
      const storedToken = getToken();
      if (!storedToken) {
        throw new Error("No se encontró el token. Inicia sesión nuevamente.");
      }

      // Redirigir al dashboard
      navigate(ROUTES.dashboard.replace(':id', String(userId)));
    } catch (err: any) {
      console.error("❌ Error en el login:", err);
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
      console.log("Carga terminada, estado:", { email, password, error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md w-96 text-center">
        <h2 className="text-lg font-bold">Auth Component</h2>
        {loading ? (
          <p className="mt-4">Cargando...</p>
        ) : (
          <form onSubmit={handleLogin} className="mt-4">
            <p>Introduce tus credenciales</p>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-4 py-2 w-full border rounded-md dark:bg-gray-700"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 px-4 py-2 w-full border rounded-md dark:bg-gray-700"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              Iniciar sesión
            </button>
          </form>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};
