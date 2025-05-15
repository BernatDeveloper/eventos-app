import { useState } from "react";
import toast from "react-hot-toast";
import { RemoveParticipantButtonProps } from "../../../types/participant";

export const RemoveParticipantButton = ({
  userId,
  onRemove,
}: RemoveParticipantButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveParticipant = async () => {
    try {
      setLoading(true);
      await onRemove(userId); // Llama al hook del padre
      toast.success("Participante eliminado exitosamente.");
    } catch (error: any) {
      toast.error("Error al eliminar al participante.");
    } finally {
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
      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
    >
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
};
