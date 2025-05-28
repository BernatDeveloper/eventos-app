import { useState, useEffect } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Category } from '../../../types/category';
import { CategoryModal } from './component/CategoryModal';
import { useAppSelector } from '../../../hooks/store';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export const CategoriesAdminPage = () => {
  const {
    fetchAllCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory
  } = useCategories();
  const { categories, loading } = useAppSelector(state => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category>();
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(undefined);
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
    const result = await Swal.fire({
      title: t('swal.delete_title'),
      text: t('swal.delete_category'),
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#bbb',
      confirmButtonText: t('button.confirm_delete'),
      cancelButtonText: t('button.cancel'),
    });

    if (result.isConfirmed) {
      await handleDeleteCategory(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Administrar Categorías</h2>

      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="custom-button primary-button"
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
              <div className='flex flex-col'>
                <span>{category.name}</span>
                <span className="secondary-text">
                  {category.description || "No description available"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="custom-button primary-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="custom-button reject-button"
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
