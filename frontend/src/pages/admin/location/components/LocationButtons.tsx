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
                className={`mt-4 w-full py-2 rounded text-white transition ${isSaveDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
                {isSaving ? 'Saving...' : 'Save Location'}
            </button>
            {mode === "edit" && (
                <button
                    onClick={handleDeleteLocation}
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    {isDeleting ? 'Deleting...' : 'Delete Location'}
                </button>
            )}
        </div>
    );
};
