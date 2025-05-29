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
        className="custom-creator-section"
        role="button"
        tabIndex={0}
        aria-label="Editar ubicación"
      >
        <h4
          className="text-xl font-bold mb-2 text-[var(--primary-color)]"
        >
          Editar ubicación
        </h4>
        <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">
          Actualiza la localización del evento.
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer self-start px-4 py-2 text-sm rounded-lg font-semibold transition 
                     bg-[var(--primary-color)] text-white hover:opacity-90 focus:outline-none 
                     focus:ring-2 focus:ring-[var(--primary-color)]"
        >
          Editar ubicación
        </button>

        <MdLocationPin
          className="absolute bottom-2 right-2 text-[8rem] rotate-12 pointer-events-none select-none opacity-20 text-[var(--primary-color)]"
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
