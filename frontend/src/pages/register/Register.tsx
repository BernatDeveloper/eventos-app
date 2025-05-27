import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/auth";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../hooks/useAuth";
import { t } from "i18next";

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
        <div className="p-8">
            <div className="w-full m-auto  max-w-md rounded-[var(--border-radius-large)] p-8 sm:p-10 space-y-6 shadow-[var(--box-shadow-heavy)] bg-[var(--background-color)] transition-all duration-300">
                <h2 className="text-2xl font-bold text-center text-[var(--text-primary-color)]">Crea tu cuenta</h2>

                {loading ? (
                    <p className="text-center text-[var(--text-muted-color)]">Cargando...</p>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1 text-[var(--text-secondary-color)]"
                            >
                                Nombre
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-[var(--border-radius-medium)] border border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1 text-[var(--text-secondary-color)]"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-[var(--border-radius-medium)] border border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1 text-[var(--text-secondary-color)]"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-[var(--border-radius-medium)] border border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium mb-1 text-[var(--text-secondary-color)]"
                            >
                                Confirmar contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-[var(--border-radius-medium)] border border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                            />
                        </div>

                        {error && (
                            <p className="text-[var(--reject-color)] text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="custom-button primary-button w-full"
                        >
                            Registrarse
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
