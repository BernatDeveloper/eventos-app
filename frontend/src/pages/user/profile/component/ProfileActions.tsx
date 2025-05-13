import { ProfileActionsProps } from "../../../../types/user";

export const ProfileActions = ({ editing, onSave, onCancel, onEdit }: ProfileActionsProps) => {
    return (
        <div className="flex gap-4 mt-2">
            {editing ? (
                <>
                    <button
                        onClick={onSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Editar nombre
                </button>
            )}
        </div>
    );
};
