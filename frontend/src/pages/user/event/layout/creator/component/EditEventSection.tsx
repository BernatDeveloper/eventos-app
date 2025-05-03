import { useState } from "react";
import { EventModal } from "../../../../../admin/events/components/EventModal";
import { useUserEvents } from "../../../../../../hooks/useUserEvents";
import { Event } from "../../../../../../types/event";

export const EditEventSection = ({ event }: { event: Event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSaveUserChanges } = useUserEvents();

  return (
    <>
      <div
        className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen(true)}
      >
        <h4 className="text-lg font-semibold mb-2 text-primary">Editar evento</h4>
        <p className="text-sm text-gray-700 mb-3">Modifica título, descripción y fechas.</p>
        <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
          Editar
        </button>
      </div>

      <EventModal
        isOpen={isOpen}
        event={event}
        onClose={() => setIsOpen(false)}
        onEdit={(id, updatedData) => handleSaveUserChanges(id, updatedData)}
      />
    </>
  );
};
