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
                        className="mt-1 block w-full rounded-md border border-[var(--border-color)] px-3 py-2 
                       shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] 
                       text-[var(--text-primary-color)] bg-white"
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
