import React from 'react';
import { LocationForm } from './components/LocationForm';
import { LocationMap } from './components/LocationMap';
import { LocationButtons } from './components/LocationButtons';
import { useLocation } from '../../../hooks/useLocation';
import { LocationModalProps } from "../../../types/location";
import { CloseModal } from '../../../shared/modals/CloseModal';
import { useTranslation } from 'react-i18next';

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, location, eventId, refreshEvents, mode }) => {
    const {
        editedLocation,
        isSaving,
        isDeleting,
        setEditedLocation,
        address,
        setAddress,
        handleSearchLocation,
        handleSaveLocation,
        handleDeleteLocation,
    } = useLocation({ location, eventId, refreshEvents, mode, onClose });
    const { t } = useTranslation('event');

    const isSaveDisabled = !editedLocation.latitude || !editedLocation.longitude || !editedLocation.name.trim() || !address;

    return (
        <div className={`custom-modal ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="bg-[var(--background-secondary-color)] rounded-[var(--border-radius-medium)] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{t('edit_location_modal.title')}</h2>
                    <CloseModal onClose={onClose} />
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
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                    onClose={onClose}
                    mode={mode}
                    isSaveDisabled={isSaveDisabled}
                />
            </div>
        </div>
    );
};