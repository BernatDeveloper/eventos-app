import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from "react-leaflet";
import { LocationModalProps } from "../../../types/location";
import { storeLocation, updateLocation, deleteLocation } from "../../../services/locationService"; // Importar el servicio
import { updateEventLocation } from "../../../services/eventService";

// Función para manejar el centro del mapa
const SetMapCenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    map.setView([lat, lng], 15); // Centra el mapa en la nueva ubicación
    return null;
};

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, location, eventId, refreshEvents, mode }) => {
    const [editedLocation, setEditedLocation] = useState(location);
    const [address, setAddress] = useState(editedLocation.address); // Mantener el estado del address

    const handleSearchLocation = async () => {
        if (!address) return; // No hacer nada si no hay dirección

        // Utilizamos un conversor a coordenadas (puedes usar Nominatim o algún API similar)
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
            alert("No se encontró la ubicación.");
        }
    };

    // Usar useMapEvent para manejar el evento de clic en el mapa
    const MapClickHandler = () => {
        useMapEvent("click", (e) => {
            const { lat, lng } = e.latlng;
            setEditedLocation((prevState) => ({
                ...prevState,
                latitude: lat,
                longitude: lng,
            }));
        });
        return null;
    };

    const handleSaveLocation = async () => {
        const locationData = {
            id: editedLocation.id,
            name: editedLocation.name.trim(),
            address: address.trim(),
            latitude: editedLocation.latitude,
            longitude: editedLocation.longitude,
        };

        // Prevent save if any required field is missing
        if (
            !locationData.name ||
            !locationData.address ||
            !locationData.latitude ||
            !locationData.longitude
        ) {
            return;
        }

        if (mode === "edit") {
            // Edit mode: update existing location
            const result = await updateLocation(locationData.id, locationData);
            console.log(mode)

            if (result) {
                alert("Location successfully updated");
                refreshEvents();
                onClose(); // Close the modal
            } else {
                alert("Error updating location");
            }
        } else if (mode === "create") {
            // Create mode: create a new location and assign it to the event
            try {
                console.log(mode)
                const newLocation = await storeLocation(locationData);
                console.log(newLocation)
                if (newLocation && eventId) {
                    const success = await updateEventLocation(eventId, newLocation.location.id);

                    if (success) {
                        alert("Location successfully created and assigned");
                        refreshEvents();
                        onClose(); // Close the modal
                    } else {
                        alert("Location created but failed to assign to event");
                    }
                } else {
                    alert("Error creating the location");
                }
            } catch (error) {
                console.error("Error during location creation/assignment:", error);
                alert("Something went wrong while creating and assigning the location");
            }
        }
    };

    const handleDeleteLocation = async () => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            const result = await deleteLocation(editedLocation.id);
            if (result) {
                alert("Location successfully deleted");
                refreshEvents();
                onClose(); // Close the modal
            } else {
                alert("Error deleting location");
            }
        }
    };

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
                            value={address} // Usamos el estado address
                            onChange={(e) => setAddress(e.target.value)} // Actualizamos el estado address
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleSearchLocation} // Buscar ubicación
                        className="my-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Search Location
                    </button>
                    {/* Mapa (solo si hay latitud y longitud) */}
                    {editedLocation.latitude !== 0 && editedLocation.longitude !== 0 && (
                        <div className="relative h-80 mb-4">
                            <MapContainer
                                center={[editedLocation.latitude, editedLocation.longitude]}
                                zoom={15}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <MapClickHandler />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[editedLocation.latitude, editedLocation.longitude]}>
                                    <Popup>{editedLocation.name}</Popup>
                                </Marker>
                                <SetMapCenter lat={editedLocation.latitude} lng={editedLocation.longitude} />
                            </MapContainer>
                        </div>
                    )}
                    {/* Coordenadas (solo si existen) */}
                    {editedLocation.latitude !== 0 && editedLocation.longitude !== 0 && (
                        <p>{`Lat: ${editedLocation.latitude}, Lng: ${editedLocation.longitude}`}</p>
                    )}
                    {/* Botón Guardar deshabilitado si faltan coords */}
                    <button
                        onClick={handleSaveLocation}
                        disabled={!editedLocation.latitude || !editedLocation.longitude || !editedLocation.name.trim() || !address}
                        className={`mt-4 w-full py-2 rounded text-white transition ${!editedLocation.latitude ||
                            !editedLocation.longitude ||
                            !editedLocation.name.trim() ||
                            !address
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        Save Location
                    </button>
                    {mode === "edit" && (
                        <button
                            onClick={handleDeleteLocation}
                            className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                        >
                            Delete Location
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="mt-2 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
