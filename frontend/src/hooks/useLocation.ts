import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeLocation, updateLocation, deleteLocation } from "../services/locationService";
import { updateEventLocation } from '../services/eventService';
import i18next from "i18next";

export const useLocation = ({ location, eventId, refreshEvents, mode, onClose }: any) => {
    const [editedLocation, setEditedLocation] = useState(location);
    const [address, setAddress] = useState(editedLocation.address);

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
            toast.error(i18next.t("error.location_not_found"));
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
                        toast(i18next.t("error.location_created_no_assigned_to_event"), {
                            icon: '⚠️',
                            style: {
                                background: '#fff3cd',
                                color: '#856404',
                            },
                        });
                    }
                } else {
                    toast.error(i18next.t("error.creating_location"));
                }
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            onClose();
        }
    };

    const handleDeleteLocation = async () => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                const result = await deleteLocation(editedLocation.id);
                if (result) {
                    toast.success(result.message);
                    if (refreshEvents) refreshEvents();
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                onClose();
            }
        }
    };

    return {
        editedLocation,
        setEditedLocation,
        address,
        setAddress,
        handleSearchLocation,
        handleSaveLocation,
        handleDeleteLocation
    };
};
