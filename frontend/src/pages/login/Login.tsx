import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { t } from 'i18next';

export const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(t('error.login'));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(ROUTES.dashboard.replace(':id', user.id));
    }
  }, [user]);

  return (
    <div className="p-8">
      <div className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-xl shadow-md bg-[var(--background-color)] text-[var(--text-primary-color)] space-y-6">
        <h2 className="text-2xl font-bold text-center text-[var(--text-primary-color)]">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary-color)]">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary-color)]">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md border-[var(--border-color)] bg-transparent text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-[var(--reject-color)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md font-semibold bg-[var(--primary-color)] text-[var(--text-on-dark-primary)] hover:brightness-110 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-muted-color)]">
            ¿No tienes una cuenta?{' '}
            <NavLink
              to={ROUTES.register}
              className="text-[var(--link-color)] hover:underline"
            >
              Regístrate
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
