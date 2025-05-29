import { ThemeSwitch } from "../../../../shared/ThemeMode/ThemeSwitch";
import { GoToAdminPanel } from "../../../../shared/redirect/GoToAdminPanel";
import { Logout } from "../../../../shared/logout/Logout";
import { User } from "../../../../types/user";

export const ProfileSettingsPanel = ({ user }: { user: User }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--background-secondary-color)] rounded-lg shadow-lg mt-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-primary-color)]">Modo de tema</span>
        <ThemeSwitch />
      </div>

      {user.role === "admin" && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[var(--text-primary-color)]">Panel de administración</span>
          <GoToAdminPanel />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-primary-color)]">Cerrar sesión</span>
        <Logout />
      </div>
    </div>
  );
};
