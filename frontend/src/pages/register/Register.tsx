import { register } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/auth";
import { ROUTES } from "../../routes/routes";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const userData: RegisterData = {
                name,
                email,
                password,
                password_confirmation: confirmPassword
            }

            const response = await register(userData);

            if (!response || !response.user) {
                throw new Error("Error en el registro. Inténtalo de nuevo.");
            }

            // Redirigir al dashboard tras el registro exitoso
            navigate(ROUTES.dashboard.replace(":id", response.user.id));
        } catch (err: any) {
            setError(err || "Error en el registro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md w-96 text-center">
                <h2 className="text-lg font-bold">Registro</h2>
                {loading ? (
                    <p className="mt-4">Cargando...</p>
                ) : (
                    <form onSubmit={handleRegister} className="mt-4">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 px-4 py-2 w-full border rounded-md dark:bg-gray-700"
                        />
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
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 px-4 py-2 w-full border rounded-md dark:bg-gray-700"
                        />
                        <button
                            type="submit"
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full"
                        >
                            Registrarse
                        </button>
                    </form>
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};
