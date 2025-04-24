import React from 'react';
import { LocationForm } from './components/LocationForm';
import { LocationMap } from './components/LocationMap';
import { LocationButtons } from './components/LocationButtons';
import { useLocation } from '../../../hooks/useLocation';
import { LocationModalProps } from "../../../types/location";

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, location, eventId, refreshEvents, mode }) => {
    const {
        editedLocation,
        setEditedLocation,
        address,
        setAddress,
        handleSearchLocation,
        handleSaveLocation,
        handleDeleteLocation,
    } = useLocation({ location, eventId, refreshEvents, mode, onClose });

    const isSaveDisabled = !editedLocation.latitude || !editedLocation.longitude || !editedLocation.name.trim() || !address;

    return (
        <div
            className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{ transition: "opacity 0.3s ease" }}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 md:w-1/2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Location Details</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <span className="text-xl">X</span>
                        </button>
                    </div>

                    <LocationForm
                        address={address}
                        setAddress={setAddress}
                        editedLocation={editedLocation}
                        setEditedLocation={setEditedLocation}
                        handleSearchLocation={handleSearchLocation}
                    />

                    {editedLocation.latitude !== 0 && editedLocation.longitude !== 0 && (
                        <LocationMap latitude={editedLocation.latitude} longitude={editedLocation.longitude} setEditedLocation={setEditedLocation} />
                    )}

                    <LocationButtons
                        handleSaveLocation={handleSaveLocation}
                        handleDeleteLocation={handleDeleteLocation}
                        onClose={onClose}
                        mode={mode}
                        isSaveDisabled={isSaveDisabled}
                    />
                </div>
            </div>
        </div>
    );
};