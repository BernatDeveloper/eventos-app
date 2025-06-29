import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { LocationMapProps } from '../../../../types/location';

// Function to handle the center of the map
const SetMapCenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    map.setView([lat, lng], 15); // Centra el mapa en la nueva ubicación
    return null;
};

// Function to handle map click events and update the location state with lat and lng
const MapClickHandler = ({ setEditedLocation }: any) => {
    useMapEvent("click", (e) => {
        const { lat, lng } = e.latlng;
        setEditedLocation((prevState: any) => ({
            ...prevState,
            latitude: lat,
            longitude: lng,
        }));
    });
    return null;
};

// Custom leaflet icon
const customIcon = new Icon({
    iconUrl: '/images/custom-map-icon.png',
    iconSize: [36, 36],
    iconAnchor: [16, 40],
    popupAnchor: [0, -38],
})

export const LocationMap: React.FC<LocationMapProps> = ({
    latitude,
    longitude,
    setEditedLocation,
    interactive = true
}) => {
    return (
        <div className="rounded-[var(--border-radius-medium)] overflow-hidden relative h-80">
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                dragging={interactive}
                scrollWheelZoom={interactive}
                doubleClickZoom={interactive}
                touchZoom={interactive}
                keyboard={interactive}
                zoomControl={interactive}
            >
                <MapClickHandler setEditedLocation={setEditedLocation} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                    <Popup>{`Lat: ${latitude}, Lng: ${longitude}`}</Popup>
                </Marker>
                <SetMapCenter lat={latitude} lng={longitude} />
            </MapContainer>
        </div>
    );
};
