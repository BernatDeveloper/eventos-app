import { ProfileUserInfoProps } from "../../../../types/user";

export const ProfileInfo = ({
    editing,
    name,
    user,
    onNameChange,
}: ProfileUserInfoProps) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="custom-label">
                    Email
                </label>
                <p className="mt-1 text-[var(--text-secondary-color)]">{user.email}</p>
                <label className="custom-label">
                    User type
                </label>
                <p className="mt-1 text-[var(--text-secondary-color)]">{user.user_type}</p>
            </div>
            <div>
                <label className="custom-label">
                    Nombre de usuario
                </label>
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="custom-input"
                    />
                ) : (
                    <p className="mt-1 text-lg font-medium text-[var(--text-primary-color)]">{name}</p>
                )}
            </div>
        </div>
    );
};
