import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationModal } from "../../../../admin/location/LocationModal";
import { EventModal } from "../../../../admin/events/components/EventModal";
import { useUserEvents } from "../../../../../hooks/useUserEvents";
import { InviteUserModal } from "../../../../../shared/modals/InviteUserModal";

export const CreatorLayout = ({ event }: { event: any }) => {
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { handleSaveUserChanges } = useUserEvents();

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

  const mode = locationData.id === 0 ? "create" : "edit";

  return (
    <>
      <p className="text-blue-700 font-semibold mb-6">Eres el creador de este evento</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Editar evento */}
        <div
          className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200"
          onClick={() => setShowEventModal(true)}
        >
          <h4 className="text-lg font-semibold mb-2 text-primary">Editar evento</h4>
          <p className="text-sm text-gray-700 mb-3">Modifica título, descripción y fechas.</p>
          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
            Editar
          </button>
        </div>

        {/* Editar ubicación */}
        <div
          className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200"
          onClick={() => setShowLocationModal(true)}
        >
          <h4 className="text-lg font-semibold mb-2 text-primary">Editar ubicación</h4>
          <p className="text-sm text-gray-700 mb-3">Actualiza la localización del evento.</p>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm">
            Editar ubicación
          </button>
        </div>

        {/* Invitar usuarios */}
        <div
          className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200 sm:col-span-2"
          onClick={() => setShowInviteModal(true)}
        >
          <h4 className="text-lg font-semibold mb-2 text-primary">Invitar participantes</h4>
          <p className="text-sm text-gray-700 mb-3">Envía invitaciones a otros usuarios fácilmente desde aquí.</p>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
            Invitar
          </button>
        </div>
      </div>

      {/* Modales */}
      <EventModal
        isOpen={showEventModal}
        event={event}
        onClose={() => setShowEventModal(false)}
        onEdit={(id, updatedData) => handleSaveUserChanges(id, updatedData)}
      />

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        location={locationData}
        eventId={event.id}
        mode={mode}
      />

      <InviteUserModal
        isOpen={showInviteModal}
        eventId={event.id}
        onClose={() => setShowInviteModal(false)}
      />
    </>
  );
};
