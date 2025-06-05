import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/auth";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Loader } from "../../shared/loader/Loader";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth()
    const navigate = useNavigate();
    const { t : tAuth } = useTranslation('auth');
    const { t : tGlobal } = useTranslation();


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(tGlobal('error.match_pwd'));
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
            <div className="w-full m-auto max-w-md rounded-[var(--border-radius-large)] p-8 sm:p-10 space-y-6 shadow-[var(--box-shadow-heavy)] bg-[var(--background-secondary-color)] transition-all duration-300">
                <h2 className="text-2xl font-bold text-center text-[var(--text-primary-color)]">{tAuth('register_title')}</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="custom-label"
                        >
                            {tAuth('label.name')}
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder={tAuth('label.name_placeholder')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="custom-input"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="custom-label"
                        >
                            {tAuth('label.mail')}
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder={tAuth('label.mail_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="custom-input"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="custom-label"
                        >
                            {tAuth('label.password')}
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="custom-input"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="custom-label"
                        >
                            {tAuth('label.confirmed_password')}
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="custom-input"
                        />
                    </div>

                    {error && (
                        <p className="text-[var(--reject-color)] text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="custom-button primary-button w-full"
                    >
                        {loading ? <Loader /> : tAuth('register')}
                    </button>
                </form>
            </div>
        </div>
    );
};
