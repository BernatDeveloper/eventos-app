import { useState } from "react";
import { InviteUserModal } from "../../../../../../shared/modals/InviteUserModal";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const InviteUsersSection = ({ eventId }: { eventId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('event');


  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        className="custom-creator-section"
        aria-label="Invitar participantes"
      >
        <h4
          className="text-xl font-bold mb-2 text-[var(--primary-color)]"
        >
          {t('creator.invite_participants.title')}
        </h4>
        <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">
          {t('creator.invite_participants.desc')}
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
          {t('creator.invite_participants.button')}
        </button>

        <MdPersonAddAlt1
          className="absolute bottom-2 right-2 text-[8rem] rotate-12 pointer-events-none select-none opacity-20 text-[var(--primary-color)]"
          aria-hidden="true"
        />
      </div>

      <InviteUserModal
        isOpen={isOpen}
        eventId={eventId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
