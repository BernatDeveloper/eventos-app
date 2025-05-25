import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeLocation, updateLocation, deleteLocation } from "../services/locationService";
import { updateEventLocation } from '../services/eventService';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export const useLocation = ({ location, eventId, refreshEvents, mode, onClose }: any) => {
    const [editedLocation, setEditedLocation] = useState(location);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [address, setAddress] = useState(editedLocation.address);
    const { t } = useTranslation();

    const handleSearchLocation = async () => {
        if (!address) return;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data && data[0]) {
            const { lat, lon } = data[0];
            setEditedLocation({
                ...editedLocation,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            });
        } else {
            toast.error(t("error.location_not_found"));
            setEditedLocation({
                ...editedLocation,
                latitude: 0,
                longitude: 0,
            });
        }
    };

    const handleSaveLocation = async () => {
        const locationData = {
            id: editedLocation.id,
            name: editedLocation.name.trim(),
            address: address.trim(),
            latitude: editedLocation.latitude,
            longitude: editedLocation.longitude,
        };

        if (!locationData.name || !locationData.address || !locationData.latitude || !locationData.longitude) return;

        setIsSaving(true);

        try {
            if (mode === "edit") {
                await updateLocation(locationData.id, locationData);
                if (refreshEvents) refreshEvents();
            } else if (mode === "create") {
                const newLocation = await storeLocation(locationData);
                if (newLocation && eventId) {
                    const success = await updateEventLocation(eventId, newLocation.location.id);
                    if (success) {
                        toast.success(success.message);
                        if (refreshEvents) refreshEvents();
                    } else {
                        toast(t("error.location_created_no_assigned_to_event"), {
                            icon: '⚠️',
                            style: {
                                background: '#fff3cd',
                                color: '#856404',
                            },
                        });
                    }
                } else {
                    toast.error(t("error.creating_location"));
                }
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(true);
            onClose();
        }
    };

    const handleDeleteLocation = async () => {
        const result = await Swal.fire({
            title: t("swal.delete_title"),
            text: t("swal.delete_location"),
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#bbb',
            confirmButtonText: t('button.confirm_delete'),
            cancelButtonText: t('button.cancel'),
        });

        if (result.isConfirmed) {
            setIsDeleting(true);
            try {
                const response = await deleteLocation(editedLocation.id);
                if (response) {
                    toast.success(response.message);
                    if (refreshEvents) refreshEvents();
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsDeleting(true);
                onClose();
            }
        }
    };


    return {
        editedLocation,
        isSaving,
        isDeleting,
        setEditedLocation,
        address,
        setAddress,
        handleSearchLocation,
        handleSaveLocation,
        handleDeleteLocation
    };
};
