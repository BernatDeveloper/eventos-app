import { useState } from "react";
import { InviteUserModal } from "../../../../../../shared/modals/InviteUserModal";

export const InviteUsersSection = ({ eventId }: { eventId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200 sm:col-span-1"
        onClick={() => setIsOpen(true)}
      >
        <h4 className="text-lg font-semibold mb-2 text-primary">Invitar participantes</h4>
        <p className="text-sm text-gray-700 mb-3">Envía invitaciones a otros usuarios fácilmente desde aquí.</p>
        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
          Invitar
        </button>
      </div>

      <InviteUserModal
        isOpen={isOpen}
        eventId={eventId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
