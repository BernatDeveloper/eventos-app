import { useState, useEffect } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Category } from '../../../types/category';
import { CategoryModal } from './component/CategoryModal';
import toast from 'react-hot-toast';

export const CategoriesAdminPage = () => {
  const {
    categories,
    loading,
    fetchAllCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: { name: string; description?: string }) => {
    if (editingCategory) {
      await handleUpdateCategory(editingCategory.id, data);
    } else {
      await handleCreateCategory(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      await handleDeleteCategory(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Administrar Categorías</h2>

      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear Nueva Categoría
        </button>
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categories.length === 0 ? (
        <p>No hay categorías.</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((category: Category) => (
            <li key={category.id} className="flex justify-between border-b pb-2">
              <span>{category.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingCategory ? { name: editingCategory.name, description: editingCategory.description } : undefined}
        mode={editingCategory ? 'edit' : 'create'}
      />
    </div>
  );
};
