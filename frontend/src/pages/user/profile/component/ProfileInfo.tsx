import { ProfileUserInfoProps } from "../../../../types/user";

export const ProfileInfo = ({ editing, name, email, onNameChange }: ProfileUserInfoProps) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                ) : (
                    <p className="mt-1 text-lg font-medium text-gray-800">{name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-600">{email}</p>
            </div>
        </div>
    );
};
