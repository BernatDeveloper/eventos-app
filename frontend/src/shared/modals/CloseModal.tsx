interface CloseButtonProps {
  onClose: () => void;
}

export const CloseModal: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700"
      aria-label="Cerrar"
    >
      <span className="text-xl">❌</span>
    </button>
  );
};
