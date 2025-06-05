import { useState } from "react";
import { MdEvent } from "react-icons/md";
import { EventModal } from "../../../../../admin/events/components/EventModal";
import { useUserEvents } from "../../../../../../hooks/useUserEvents";
import { EditableEventFields, EditEventSectionProps } from "../../../../../../types/event";
import { useTranslation } from "react-i18next";

export const EditEventSection = ({ event, fetchEvent }: EditEventSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSaveEventChanges } = useUserEvents();
  const { t } = useTranslation('event');


  const handleEditEvent = async (id: string, updatedData: EditableEventFields) => {
    await handleSaveEventChanges(id, updatedData);
    fetchEvent(id);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        className="custom-creator-section"
        aria-label="Editar evento"
      >
        <h4
          className="text-xl font-bold mb-2 text-[var(--primary-color)]"
        >
          {t('creator.event.title')}
        </h4>
        <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">
          {t('creator.event.desc')}
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
          {t('creator.event.button')}
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
        onEdit={(id, updatedData) => handleEditEvent(id, updatedData)}
      />
    </>
  );

};
