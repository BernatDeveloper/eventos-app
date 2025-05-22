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
    <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to={ROUTES.home}
          className="flex items-center text-blue-600 font-extrabold text-2xl gap-2 hover:text-blue-700 transition"
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
                `relative text-gray-700 font-semibold text-sm hover:text-blue-600 transition ${
                  isActive ? "text-blue-700 font-bold" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-blue-600
                    transition-transform duration-300 ease-in-out
                    ${isActive ? "scale-x-100" : "scale-x-0"}
                    origin-left`}
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
