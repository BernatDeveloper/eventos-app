import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { MdEvent } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { HiMenu, HiX } from 'react-icons/hi';

export const PublicNavbar = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <nav className="bg-[var(--header-background-color)] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <NavLink
                    to={ROUTES.home}
                    className="flex items-center text-[var(--primary-color)] font-extrabold text-[var(--font-size-xlarge)] gap-2"
                >
                    <MdEvent className="text-3xl" />
                    EventApp
                </NavLink>

                <div className="hidden sm:flex space-x-4">
                    <NavLink to={ROUTES.login} className="custom-button cancel-button">
                        {t('auth.login')}
                    </NavLink>
                    <NavLink to={ROUTES.register} className="custom-button primary-button">
                        {t('auth.register')}
                    </NavLink>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="sm:hidden text-[var(--primary-color)] focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                </button>
            </div>

            <div
                className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${open
                        ? 'max-h-[200px] opacity-100 scale-100 px-6 pb-4'
                        : 'max-h-0 opacity-0 scale-95 px-6 pb-0'
                    }`}
            >
                <NavLink
                    to={ROUTES.login}
                    className={`block w-full text-center custom-button cancel-button ${open && 'mb-3'} `}
                    onClick={() => setOpen(false)}
                >
                    {t('auth.login')}
                </NavLink>
                <NavLink
                    to={ROUTES.register}
                    className="block w-full text-center custom-button primary-button"
                    onClick={() => setOpen(false)}
                >
                    {t('auth.register')}
                </NavLink>
            </div>

        </nav>
    );


};
