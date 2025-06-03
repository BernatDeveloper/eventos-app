import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { MdEvent } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const PublicNavbar = () => {
    const { t } = useTranslation();

    return (
        <nav className="bg-[var(--header-background-color)] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <NavLink
                    to={ROUTES.home}
                    className="flex items-center text-[var(--primary-color)] font-extrabold text-[var(--font-size-xlarge)] gap-2"
                >
                    <MdEvent className="text-3xl" />
                    EventApp
                </NavLink>
                <div className="space-x-4">
                    <NavLink
                        to={ROUTES.login}
                        className="custom-button cancel-button"
                    >
                        {t('auth.login')}
                    </NavLink>
                    <NavLink
                        to={ROUTES.register}
                        className="custom-button primary-button"
                    >
                        {t('auth.register')}
                    </NavLink>
                </div>
            </div>
        </nav>
    )
};
