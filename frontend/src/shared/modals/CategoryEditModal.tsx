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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
