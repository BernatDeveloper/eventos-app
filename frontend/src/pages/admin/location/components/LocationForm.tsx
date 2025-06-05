import React from 'react';
import { LocationFormProps } from '../../../../types/location';
import { useTranslation } from 'react-i18next';

export const LocationForm: React.FC<LocationFormProps> = ({
    address,
    setAddress,
    editedLocation,
    setEditedLocation,
    handleSearchLocation,
}) => {
        const { t } = useTranslation('event');
    
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="locationName" className="custom-label">
                    {t('edit_location_modal.name')}
                </label>
                <input
                    id="locationName"
                    type="text"
                    value={editedLocation.name}
                    onChange={(e) => setEditedLocation({ ...editedLocation, name: e.target.value })}
                    className="custom-input"
                />
            </div>
            <div>
                <label htmlFor="locationAddress" className="custom-label">
                    {t('edit_location_modal.address')}
                </label>
                <input
                    id="locationAddress"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="custom-input"
                />
            </div>
            <button
                onClick={handleSearchLocation}
                className="custom-button primary-button w-full my-[var(--spacing-sm)]"
            >
                {t('edit_location_modal.button.search')}
            </button>
        </div>
    );
};
