import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { MdEvent } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();


  const links = [
    { to: ROUTES.home, label: t("navbar.home") },
    { to: ROUTES.dashboard, label: t("navbar.dashboard") },
    { to: ROUTES.profile, label: t("navbar.profile") },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-[var(--background-secondary-color)] shadow-md sticky top-0 z-60">
      <div className="max-w-7xl mx-auto px-6 py-[var(--spacing-md)] flex items-center justify-between">
        <NavLink
          to={ROUTES.home}
          className="flex items-center text-[var(--primary-color)] font-extrabold text-[var(--font-size-xlarge)] gap-2"
        >
          <MdEvent className="text-3xl" />
          <h3 className="font-bold text-[var(--font-size-large)]">EventApp</h3>
        </NavLink>

        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--primary-color)] text-2xl"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex items-center space-x-10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative font-semibold text-[var(--text-secondary-color)] text-[var(--font-size-small)] hover:text-[var(--link-color)] transition ${isActive ? "text-[var(--link-color)] font-bold" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--link-color)]
                    transition-transform duration-300 ease-in-out ${isActive ? "scale-x-100" : "scale-x-0"} origin-left`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col items-start px-6 pb-4 pt-2 gap-3">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `relative font-semibold text-[var(--text-secondary-color)] text-[var(--font-size-small)] hover:text-[var(--link-color)] transition ${isActive ? "text-[var(--link-color)] font-bold" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--link-color)]
                    transition-transform duration-300 ease-in-out ${isActive ? "scale-x-100" : "scale-x-0"} origin-left`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
