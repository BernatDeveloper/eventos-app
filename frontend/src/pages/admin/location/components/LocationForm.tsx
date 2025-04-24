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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                onClick={handleSearchLocation}
                className="my-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
                Search Location
            </button>
        </div>
    );
};
