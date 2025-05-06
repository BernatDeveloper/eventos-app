import { useState } from "react";
import { LocationModal } from "../../../../../admin/location/LocationModal";
import { Event } from "../../../../../../types/event";
import { EditLocationSectionProps } from "../../../../../../types/location";

export const EditLocationSection = ({ event, fetchEvent }: EditLocationSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    fetchEvent(event.id);
  };

  const fallbackLocation = {
    id: 0,
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
  };

  const locationData = event.location
    ? {
        id: event.location_id,
        name: event.location.name,
        address: event.location.address,
        latitude: event.location.latitude,
        longitude: event.location.longitude,
      }
    : fallbackLocation;

  const mode = event.location === null ? "create" : "edit";

  return (
    <>
      <div
        className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen(true)}
      >
        <h4 className="text-lg font-semibold mb-2 text-primary">Editar ubicación</h4>
        <p className="text-sm text-gray-700 mb-3">Actualiza la localización del evento.</p>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm">
          Editar ubicación
        </button>
      </div>

      <LocationModal
        isOpen={isOpen}
        onClose={handleClose}
        location={locationData}
        eventId={event.id}
        mode={mode}
      />
    </>
  );
};
