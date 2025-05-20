import { useState } from "react";
import { RemoveParticipantButtonProps } from "../../../types/participant";

export const RemoveParticipantButton = ({
  userId,
  onRemove,
}: RemoveParticipantButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveParticipant = async () => {
    await onRemove(userId);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita que se dispare el navigate del <li>
        handleRemoveParticipant();
      }}
      disabled={loading}
      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
    >
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
};
