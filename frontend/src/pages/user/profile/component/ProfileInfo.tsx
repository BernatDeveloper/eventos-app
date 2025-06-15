import { useTranslation } from "react-i18next";
import { ProfileUserInfoProps } from "../../../../types/user";

export const ProfileInfo = ({
    editing,
    name,
    user,
    onNameChange,
}: ProfileUserInfoProps) => {
    const { t } = useTranslation('profile')

    return (
        <div className="space-y-8">
            <div className="grid gap-4">
                <div>
                    <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                        {t('label.mail')}:
                    </label>
                    <p className="mt-1 text-[var(--text-primary-color)] font-medium break-all">{user.email}</p>
                </div>
                <div>
                    <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                        {t('label.user_type')}:
                    </label>
                    <p className="mt-1 text-[var(--text-primary-color)] font-medium">{user.user_type}</p>
                </div>
                <div>
                    <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                        {t('label.role')}:
                    </label>
                    <p className="mt-1 text-[var(--text-primary-color)] font-medium">{user.role}</p>
                </div>
            </div>

            <div className="grid">
                <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                    {t('label.user_name')}:
                </label>
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="custom-input px-4 py-2 rounded-[var(--border-radius-medium)] border border-[var(--border-color)] bg-white text-[var(--text-primary-color)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                    />
                ) : (
                    <p className="mt-1 text-[var(--text-primary-color)] text-lg font-semibold">{name}</p>
                )}
            </div>
        </div>
    );

};
