import { ProfileActionsProps } from "../../../../types/user";

export const ProfileActions = ({ editing, onSave, onCancel, onEdit }: ProfileActionsProps) => {
    return (
        <div className="flex gap-4 mt-2">
            {editing ? (
                <>
                    <button
                        onClick={onSave}
                        className="custom-button primary-button"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={onCancel}
                        className="custom-button cancel-button"
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <button
                    onClick={onEdit}
                    className="custom-button primary-button"
                >
                    Editar nombre
                </button>
            )}
        </div>
    );
};
