import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const { t : tGlobal } = useTranslation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(tGlobal('error.login'));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(ROUTES.dashboard.replace(':id', user.id));
    }
  }, [user]);

  return (
    <div className="p-8">
      <div className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-xl shadow-[var(--box-shadow-heavy)] bg-[var(--background-secondary-color)] text-[var(--text-primary-color)] space-y-6">
        <h2 className="text-2xl font-bold text-center text-[var(--text-primary-color)]">{t('login_title')}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="custom-label">{t('label.mail')}</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder={t('label.mail_placeholder')}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="custom-label">{t('label.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='••••••••'
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-input"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-[var(--reject-color)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="custom-button primary-button w-full"
          >
            {t('login_title')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-muted-color)]">
            {t('register_phrase')}{' '}
            <NavLink
              to={ROUTES.register}
              className="text-[var(--link-color)] hover:underline"
            >
              {t('register')}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
