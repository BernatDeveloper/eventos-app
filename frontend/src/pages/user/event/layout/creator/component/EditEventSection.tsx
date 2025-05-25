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
        className="relative cursor-pointer rounded-xl p-6 shadow-[var(--box-shadow-light)] transition flex flex-col bg-white border border-[var(--border-color)] hover:shadow-[var(--box-shadow-heavy)]"
        aria-label="Editar evento"
      >
        <h4
          className="text-xl font-bold mb-2 text-[var(--primary-color)]"
        >
          Editar evento
        </h4>
        <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">
          Modifica título, descripción y fechas.
        </p>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer self-start px-4 py-2 text-sm rounded-lg font-semibold transition 
                   bg-[var(--primary-color)] text-white hover:opacity-90 focus:outline-none 
                   focus:ring-2 focus:ring-[var(--primary-color)]"
        >
          Editar
        </button>

        <MdEvent
          className="absolute bottom-2 right-2 text-[8rem] rotate-12 pointer-events-none select-none opacity-20 text-[var(--primary-color)]"
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
