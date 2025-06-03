import { ProfileUserInfoProps } from "../../../../types/user";

export const ProfileInfo = ({
    editing,
    name,
    user,
    onNameChange,
}: ProfileUserInfoProps) => {
    return (
        <div className="space-y-8">
            <div className="grid gap-4">
                <div>
                    <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                        Email
                    </label>
                    <p className="mt-1 text-[var(--text-primary-color)] font-medium">{user.email}</p>
                </div>
                <div>
                    <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                        User type
                    </label>
                    <p className="mt-1 text-[var(--text-primary-color)] font-medium">{user.user_type}</p>
                </div>
            </div>

            <div className="grid gap-2">
                <label className="custom-label text-[var(--text-secondary-color)] text-sm">
                    Nombre de usuario
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
