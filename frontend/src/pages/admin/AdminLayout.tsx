import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { Navbar } from "../../shared/Navbar/Navbar";
import { Footer } from "../../shared/Footer/Footer";

export const AdminLayout = () => {
  const navItems = [
    { to: ROUTES.admin.dashboard, label: 'Dashboard' },
    { to: ROUTES.admin.users, label: 'Users' },
    { to: ROUTES.admin.events, label: 'Events' },
    { to: ROUTES.admin.categories, label: 'Categories' },
  ];

  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_auto_1fr_auto]">
      <Navbar />

      <div className="bg-[var(--primary-color)] text-[var(--text-on-dark-primary)] shadow-[var(--box-shadow-medium)] px-[var(--spacing-xl)] py-[var(--spacing-md)] flex items-center gap-[var(--spacing-xl)]">
        <h3 className="text-[var(--text-on-dark-primary)] font-bold text-[var(--font-size-large)]">
          Admin Panel
        </h3>
        <nav className="flex gap-[var(--spacing-lg)]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive
                  ? 'text-[var(--text-on-dark-secondary)] font-semibold underline'
                  : 'hover:text-[var(--text-on-dark-muted)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="p-[var(--spacing-xl)] bg-[var(--background-color)] shadow-inner">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
