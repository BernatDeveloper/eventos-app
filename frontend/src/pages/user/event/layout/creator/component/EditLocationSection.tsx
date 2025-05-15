import { useState } from "react";
import { LocationModal } from "../../../../../admin/location/LocationModal";
import { EditLocationSectionProps } from "../../../../../../types/location";
import { MdLocationPin } from "react-icons/md";

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
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer rounded-xl p-6 shadow-md transition flex flex-col
                   bg-gradient-to-l from-indigo-400 via-purple-500 to-pink-500
                   hover:from-indigo-500 hover:via-purple-600 hover:to-pink-600"
      >
        <h4 className="text-xl font-bold text-white mb-2">Editar ubicación</h4>
        <p className="text-white/90 mb-5 flex-grow">
          Actualiza la localización del evento.
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer self-start px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold transition
                     hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Editar ubicación
        </button>

        <MdLocationPin
          className="absolute bottom-0 right-0 text-white opacity-20 text-[8rem] rotate-12 pointer-events-none select-none"
          aria-hidden="true"
        />
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
