import { useTranslation } from "react-i18next";
import { ProfileActionsProps } from "../../../../types/user";

export const ProfileActions = ({ editing, onSave, onCancel, onEdit }: ProfileActionsProps) => {
    const { t: tProfile } = useTranslation('profile')
    const { t: tGlobal } = useTranslation()

    return (
        <div className="flex gap-4 mt-2">
            {editing ? (
                <>
                    <button
                        onClick={onSave}
                        className="custom-button primary-button"
                    >
                        {tGlobal('button.save')}
                    </button>
                    <button
                        onClick={onCancel}
                        className="custom-button cancel-button"
                    >
                        {tGlobal('button.cancel')}
                    </button>
                </>
            ) : (
                <button
                    onClick={onEdit}
                    className="custom-button primary-button"
                >
                    {tProfile('button.edit_name')}
                </button>
            )}
        </div>
    );
};
