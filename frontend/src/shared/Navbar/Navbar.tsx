import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { MdEvent } from "react-icons/md";

export const Navbar = () => {
  const links = [
    { to: ROUTES.home, label: "Home" },
    { to: ROUTES.dashboard, label: "Dashboard" },
    { to: ROUTES.profile, label: "Profile" },
  ];

  return (
    <nav className="bg-[var(--header-background-color)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-[var(--spacing-md)] flex items-center justify-between">
        <NavLink
          to={ROUTES.home}
          className="flex items-center text-[var(--primary-color)] font-extrabold text-[var(--font-size-xlarge)] gap-2"
        >
          <MdEvent className="text-3xl" />
          EventApp
        </NavLink>

        <div className="flex items-center space-x-10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative font-semibold text-[var(--text-secondary-color)] text-[var(--font-size-small)] hover:text-[var(--link-color)] transition ${isActive ? "text-[var(--link-color)] font-bold" : ""}`}
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
