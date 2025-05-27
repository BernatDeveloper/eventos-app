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
    const deleted = await handleDelete(eventId, locationId);
    if (deleted) {
      navigate(ROUTES.dashboard);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-[var(--reject-color)] transition duration-200 hover:animate-(--shake-animation)"
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
