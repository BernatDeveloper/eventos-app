import { ThemeSwitch } from "../../../../shared/ThemeMode/ThemeSwitch";
import { GoToAdminPanel } from "../../../../shared/redirect/GoToAdminPanel";
import { Logout } from "../../../../shared/logout/Logout";
import { User } from "../../../../types/user";
import { GoToPremiumPlan } from "../../../../shared/redirect/GoToPremiumPlan";
import { useTranslation } from "react-i18next";

export const ProfileSettingsPanel = ({ user }: { user: User }) => {
  const { t } = useTranslation('profile')
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--background-secondary-color)] rounded-lg shadow-lg mt-8">
      <div className="flex items-center justify-center sm:justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">{t('settings.label.theme.title')}</span>
        <ThemeSwitch />
      </div>

      <div className="flex items-center justify-center sm:justify-between mb-4">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">{t('settings.label.take_premium')}</span>
        <GoToPremiumPlan />
      </div>

      {user.role === "admin" && (
        <div className="flex items-center justify-center sm:justify-between mb-4">
          <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">{t('settings.label.admin_panel.title')}</span>
          <GoToAdminPanel />
        </div>
      )}

      <div className="flex items-center justify-center sm:justify-between">
        <span className="text-sm font-medium text-[var(--text-primary-color)] hidden sm:inline">{t('settings.label.close_session.title')}</span>
        <Logout />
      </div>
    </div>
  );
};
