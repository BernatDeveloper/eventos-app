import { ThemeSwitch } from "../../../../shared/ThemeMode/ThemeSwitch";
import { GoToAdminPanel } from "../../../../shared/redirect/GoToAdminPanel";
import { Logout } from "../../../../shared/logout/Logout";
import { User } from "../../../../types/user";
import { GoToPremiumPlan } from "../../../../shared/redirect/GoToPremiumPlan";

export const ProfileSettingsPanel = ({ user }: { user: User }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--background-secondary-color)] rounded-lg shadow-lg mt-8">
      <div className="flex items-center justify-center sm:justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">Modo de tema</span>
        <ThemeSwitch />
      </div>

      <div className="flex items-center justify-center sm:justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">Obtener premium</span>
        <GoToPremiumPlan />
      </div>

      {user.role === "admin" && (
        <div className="flex items-center justify-center sm:justify-between mb-4">
          <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">Panel de administración</span>
          <GoToAdminPanel />
        </div>
      )}

      <div className="flex items-center justify-center sm:justify-between">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">Cerrar sesión</span>
        <Logout />
      </div>
    </div>
  );
};
