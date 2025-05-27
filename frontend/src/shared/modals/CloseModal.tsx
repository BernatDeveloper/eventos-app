import { IoClose } from "react-icons/io5";
import type { FC } from "react";

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseModal: FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="text-[var(--text-muted-color)] hover:text-[var(--text-primary-color)] transition-colors duration-200"
      aria-label="Close modal"
      title="Close"
    >
      <IoClose size={24} />
    </button>
  );
};
