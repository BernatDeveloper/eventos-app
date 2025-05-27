import { ProfileUserInfoProps } from "../../../../types/user";

export const ProfileInfo = ({
    editing,
    name,
    email,
    onNameChange,
}: ProfileUserInfoProps) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-[var(--text-secondary-color)]">
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

            <div>
                <label className="block text-sm font-medium text-[var(--text-secondary-color)]">
                    Email
                </label>
                <p className="mt-1 text-[var(--text-secondary-color)]">{email}</p>
            </div>
        </div>
    );
};
