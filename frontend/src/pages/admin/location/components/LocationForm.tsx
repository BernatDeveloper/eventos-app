import React from 'react';
import { LocationFormProps } from '../../../../types/location';

export const LocationForm: React.FC<LocationFormProps> = ({
    address,
    setAddress,
    editedLocation,
    setEditedLocation,
    handleSearchLocation,
}) => {
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
                    Location Name
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
                <label htmlFor="locationAddress" className="block text-sm font-medium text-gray-700">
                    Location Address
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
                Search Location
            </button>
        </div>
    );
};
