import React from 'react';
import { LocationButtonsProps } from '../../../../types/location';

export const LocationButtons: React.FC<LocationButtonsProps> = ({
    handleSaveLocation,
    handleDeleteLocation,
    isSaving,
    isDeleting,
    mode,
    isSaveDisabled,
}) => {
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
                {isSaving ? 'Saving...' : 'Save Location'}
            </button>

            {mode === "edit" && (
                <button
                    onClick={handleDeleteLocation}
                    className="custom-button reject-button w-full mt-[var(--spacing-sm)]"
                >
                    {isDeleting ? 'Deleting...' : 'Delete Location'}
                </button>
            )}
        </div>
    );
};
