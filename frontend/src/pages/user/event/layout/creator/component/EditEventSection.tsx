import { useState } from "react";
import { MdEvent } from "react-icons/md";
import { EventModal } from "../../../../../admin/events/components/EventModal";
import { useUserEvents } from "../../../../../../hooks/useUserEvents";
import { Event } from "../../../../../../types/event";

export const EditEventSection = ({ event }: { event: Event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSaveUserChanges } = useUserEvents();

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer rounded-xl p-6 shadow-md transition flex flex-col
                   bg-gradient-to-l from-pink-400 via-red-400 to-yellow-400
                   hover:from-pink-500 hover:via-red-500 hover:to-yellow-500"
        aria-label="Editar evento"
      >
        <h4 className="text-xl font-bold text-white mb-2">Editar evento</h4>
        <p className="text-white/90 mb-5 flex-grow">
          Modifica título, descripción y fechas.
        </p>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer self-start px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Editar
        </button>

        <MdEvent
          className="absolute bottom-1 right-0 text-[8rem] rotate-12 pointer-events-none select-none gradient-text opacity-30"
          aria-hidden="true"
        />
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
