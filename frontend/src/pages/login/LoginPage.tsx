import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { getToken } from "../../services/authService"; // Importa getToken

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para redireccionar

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");

    try {
      setLoading(true);
      setError(null);

      await login(email, password);

      const token = getToken();
      if (!token) {
        throw new Error("No se encontró el token. Inicia sesión nuevamente.");
      }

      navigate(ROUTES.dashboard);
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
