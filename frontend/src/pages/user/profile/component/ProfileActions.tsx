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
                        className="px-4 py-2 rounded-md font-semibold transition 
                       bg-[var(--bg-secondary-color)] text-[var(--text-primary-color)] 
                       border border-[var(--border-color)] hover:bg-[var(--hover-bg-secondary)]"
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
