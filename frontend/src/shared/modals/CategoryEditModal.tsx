import { useState } from "react";
import { CategorySelect } from "../category/CategorySelect";
import { useCategories } from "../../hooks/useCategories";

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
        <h2 className="text-lg font-bold mb-4">Edit Category</h2>
        <CategorySelect
          categoryId={Number(selectedCategory)}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          required
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
