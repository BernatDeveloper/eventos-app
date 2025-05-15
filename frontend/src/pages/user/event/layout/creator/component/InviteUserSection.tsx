import { useState } from "react";
import { InviteUserModal } from "../../../../../../shared/modals/InviteUserModal";
import { MdPersonAddAlt1 } from "react-icons/md";

export const InviteUsersSection = ({ eventId }: { eventId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        className="relative z-0 cursor-pointer rounded-xl p-6 transition flex flex-col overflow-hidden
                   bg-gradient-to-l from-blue-400 via-indigo-500 to-purple-500
                   hover:from-blue-500 hover:via-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg"
        aria-label="Invitar participantes"
      >
        <h4 className="text-xl font-bold text-white mb-2">Invitar participantes</h4>
        <p className="text-white mb-5 flex-grow">
          Envía invitaciones a otros usuarios.
        </p>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="cursor-pointer self-start px-4 py-2 bg-white text-blue-700 hover:bg-gray-100 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Invitar
        </button>

        <MdPersonAddAlt1
          className="absolute bottom-0 right-0 text-white opacity-20 text-[8rem] rotate-12 pointer-events-none select-none"
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
