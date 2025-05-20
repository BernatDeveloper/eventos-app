import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/auth";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../hooks/useAuth";
import { t } from "i18next";
import BackToLogin from "../../shared/redirect/BackToLogin";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth()
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(t('error.match_pwd'));
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

            await register(userData);

            // Redirigir al dashboard tras el registro exitoso
            navigate(ROUTES.dashboard);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <BackToLogin />
            <div className="w-full m-auto max-w-md shadow-2xl rounded-xl p-8 sm:p-10 space-y-6 transition-all duration-300">
                <h2 className="text-2xl font-bold text-center">Crea tu cuenta</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Cargando...</p>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">Correo electrónico</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirmar contraseña</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Registrarse
                        </button>
                    </form>
                )}
            </div>
        </>

    );
};
