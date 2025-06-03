import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { FiMenu, FiX, FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { to: ROUTES.admin.dashboard, label: t("navbar.dashboard") },
    { to: ROUTES.admin.users, label: t("navbar.users") },
    { to: ROUTES.admin.events, label: t("navbar.events") },
    { to: ROUTES.admin.categories, label: t("navbar.categories") },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="sticky top-0 z-60 bg-[var(--primary-color)] text-[var(--text-on-dark-primary)] shadow-[var(--box-shadow-medium)] px-6 py-[var(--spacing-md)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={toggleMenu}>
          <NavLink
            to={ROUTES.admin.dashboard}
            className="flex items-center text-[var(--text-primary-color)] font-extrabold text-[var(--font-size-xlarge)] gap-2"
          >
            <FiSettings className="text-xl" />
            <h3 className="font-bold text-[var(--font-size-large)]">Admin Panel</h3>
          </NavLink>
        </div>

        <button
          className="md:hidden text-[var(--text-on-dark-primary)] text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="hidden md:flex gap-[var(--spacing-lg)]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive
                  ? "text-[var(--text-on-dark-secondary)] font-semibold underline"
                  : "hover:text-[var(--text-on-dark-muted)]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen
          ? "max-h-[500px] opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
          }`}
      >
        <nav className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive
                  ? "text-[var(--text-on-dark-secondary)] font-semibold underline"
                  : "hover:text-[var(--text-on-dark-muted)]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
