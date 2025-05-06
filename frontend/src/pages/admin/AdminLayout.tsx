import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export const AdminLayout = () => {
  const navItems = [
    { to: ROUTES.admin.dashboard, label: 'Dashboard' },
    { to: ROUTES.admin.users, label: 'Users' },
    { to: ROUTES.admin.events, label: 'Events' },
    { to: ROUTES.admin.categories, label: 'Categories' },
  ];
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400 font-semibold' : 'hover:text-gray-300'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
