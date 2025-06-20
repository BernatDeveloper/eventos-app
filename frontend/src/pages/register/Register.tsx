import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/auth";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Loader } from "../../shared/loader/Loader";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth()
    const navigate = useNavigate();
    const { t: tAuth } = useTranslation('auth');
    const { t: tGlobal } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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

                    <div className="relative">
                        <label htmlFor="password" className="custom-label">
                            {tAuth('label.password')}
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="custom-input !pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-[70%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    <div className="relative mt-4">
                        <label htmlFor="confirmPassword" className="custom-label">
                            {tAuth('label.confirmed_password')}
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="custom-input !pr-14"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-5 top-[70%] translate-y-[-50%] text-gray-500 hover:text-gray-700"
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
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
