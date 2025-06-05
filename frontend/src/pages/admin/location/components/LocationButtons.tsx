import React from 'react';
import { LocationButtonsProps } from '../../../../types/location';
import { useTranslation } from 'react-i18next';

export const LocationButtons: React.FC<LocationButtonsProps> = ({
    handleSaveLocation,
    handleDeleteLocation,
    isSaving,
    isDeleting,
    mode,
    isSaveDisabled,
}) => {
    const { t } = useTranslation('event');
    return (
        <div>
            <button
                onClick={handleSaveLocation}
                disabled={isSaveDisabled}
                className={`custom-button primary-button w-full mt-[var(--spacing-sm)] text-white font-semibold py-2 px-4 rounded 
                        ${isSaveDisabled
                        ? "bg-blue-300 !cursor-not-allowed opacity-50"
                        : "bg-blue-500 hover:bg-blue-600"}`}
            >
                {isSaving ? t('edit_location_modal.button.saving')  : t('edit_location_modal.button.save')}
            </button>

            {mode === "edit" && (
                <button
                    onClick={handleDeleteLocation}
                    className="custom-button reject-button w-full mt-[var(--spacing-sm)]"
                >
                    {isDeleting ? t('edit_location_modal.button.deleting') : t('edit_location_modal.button.delete')}
                </button>
            )}
        </div>
    );
};
