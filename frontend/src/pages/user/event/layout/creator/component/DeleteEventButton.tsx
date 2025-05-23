import { FiTrash2 } from "react-icons/fi"; // Papelera
import { useAdminEvents } from "../../../../../../hooks/useAdminEvents";
import { Loader } from "../../../../../../shared/loader/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../../routes/routes";
import { DeleteEventButtonProps } from "../../../../../../types/event";

export const DeleteEventButton = ({ eventId, locationId }: DeleteEventButtonProps) => {
  const { handleDelete, deleting } = useAdminEvents();
  const navigate = useNavigate()

  const handleClick = async () => {
      await handleDelete(eventId, locationId);
      //navigate(ROUTES.dashboard)

  };

  return (
    <button
      onClick={handleClick}
      className="text-red-600 hover:text-red-800 transition flex items-center gap-2 disabled:opacity-50"
      disabled={deleting}
      title="Eliminar evento"
    >
      {deleting ? (
        <Loader />
      ) : (
        <FiTrash2 size={20} />
      )}
    </button>
  );
};
