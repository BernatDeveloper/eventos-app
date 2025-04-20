import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { LocationModalProps } from "../../../types/location";
import { updateLocation } from "../../../services/locationService"; // Importar el servicio

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, location, refreshEvents }) => {
    const [editedLocation, setEditedLocation] = useState(location);

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
        // Llamamos a la función de servicio para actualizar la ubicación
        const updatedLocation = {
            id: editedLocation.id,
            name: editedLocation.name,
            latitude: editedLocation.latitude,
            longitude: editedLocation.longitude,
        };

        const result = await updateLocation(editedLocation.id, updatedLocation);

        if (result) {
            alert("Ubicación actualizada con éxito");
            refreshEvents()
            onClose(); // Cerrar el modal después de guardar
        } else {
            alert("Error al actualizar la ubicación");
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
                            value={editedLocation.name} // Cambiar a value para controlado
                            onChange={(e) => setEditedLocation({ ...editedLocation, name: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="relative h-80 mb-4">
                        <MapContainer
                            center={[editedLocation.latitude, editedLocation.longitude]}
                            zoom={15}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <MapClickHandler /> {/* Llamamos al manejador de clics */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[editedLocation.latitude, editedLocation.longitude]}>
                                <Popup>{editedLocation.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <p>
                        {editedLocation && `Lat: ${editedLocation.latitude}, Lng: ${editedLocation.longitude}`}
                    </p>
                    <button
                        onClick={handleSaveLocation} // Guardar ubicación editada
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Save Location
                    </button>
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
