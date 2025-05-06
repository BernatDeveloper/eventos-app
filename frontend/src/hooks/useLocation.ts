import { useState } from 'react';
import toast from 'react-hot-toast';
import { storeLocation, updateLocation, deleteLocation } from "../services/locationService";
import { updateEventLocation } from '../services/eventService';

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
            toast.error("Location not found.");
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
                const result = await updateLocation(locationData.id, locationData);
                if (result) {
                    toast.success(result.message);
                    if (refreshEvents) refreshEvents();
                } else {
                    toast.error("Error updating location");
                }
            } else if (mode === "create") {
                const newLocation = await storeLocation(locationData);
                if (newLocation && eventId) {
                    const success = await updateEventLocation(eventId, newLocation.location.id);
                    if (success) {
                        toast.success(success.message);
                        if (refreshEvents) refreshEvents();
                    } else {
                        toast("⚠️ Location created but failed to assign to event", {
                            icon: '⚠️',
                            style: {
                                background: '#fff3cd',
                                color: '#856404',
                            },
                        });
                    }
                } else {
                    toast.error("Error creating the location");
                }
            }
        } catch (error) {
            toast.error("Error updating locatioooooooon");
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
                    refreshEvents();
                }
            } catch (error) {
                toast.error("Error deleting location");
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
