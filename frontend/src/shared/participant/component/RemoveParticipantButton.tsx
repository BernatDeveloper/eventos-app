import { useState } from "react";
import { RemoveParticipantButtonProps } from "../../../types/participant";
import Swal from "sweetalert2";

export const RemoveParticipantButton = ({
  userId,
  onRemove,
}: RemoveParticipantButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveParticipant = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar participante?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "my-confirm-button",
        cancelButton: "my-cancel-button",
      },
    });

    if (result.isConfirmed) {
        setLoading(true);
        await onRemove(userId);
        setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita que se dispare el navigate del <li>
        handleRemoveParticipant();
      }}
      disabled={loading}
      className="custom-button reject-button"
    >
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
};
