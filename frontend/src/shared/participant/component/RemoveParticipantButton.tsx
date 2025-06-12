import { useState } from "react";
import { RemoveParticipantButtonProps } from "../../../types/participant";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export const RemoveParticipantButton = ({
  userId,
  onRemove,
}: RemoveParticipantButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('event');
  const { t: tGlobal } = useTranslation();

  const handleRemoveParticipant = async () => {
    const result = await Swal.fire({
      title: tGlobal('swal.delete_title'),
      text: tGlobal('swal.delete_participant'),
      showCancelButton: true,
      confirmButtonText: tGlobal('button.confirm_delete'),
      cancelButtonText: tGlobal('button.cancel'),
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
      {loading ? t('event_participants.button.deleteing') : t('event_participants.button.delete')}
    </button>
  );
};
