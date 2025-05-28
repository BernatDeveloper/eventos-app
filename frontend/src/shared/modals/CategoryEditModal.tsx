import { useState } from "react";
import { CategorySelect } from "../category/CategorySelect";
import { useCategories } from "../../hooks/useCategories";
import { CloseModal } from "./CloseModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  initialCategoryId: number | null;
  refreshEvents: () => void;
}

export const CategoryEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  eventId,
  initialCategoryId,
  refreshEvents,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId);
  const { handleUpdateEventCategory } = useCategories()

  const handleSave = async () => {
    if (!eventId || selectedCategory === null) return;
    await handleUpdateEventCategory(eventId, selectedCategory);
    refreshEvents();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Edit Category</h2>
            <CloseModal onClose={onClose} />
          </div>
          <CategorySelect
            categoryId={Number(selectedCategory)}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            required
          />
          <button
            onClick={handleSave}
            className="w-full custom-button primary-button mt-[var(--spacing-sm)] "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
