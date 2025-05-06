import React, { useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { Category, CategorySelectProps } from '../../types/category';

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange, required = false }) => {
  const { fetchAllCategories, categories, loading } = useCategories();

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <select
      name="category_id"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border p-2 rounded"
    >
      <option value="">Selecciona una categoría</option>
      {loading ? (
        <option disabled>Cargando categorías...</option>
      ) : (
        categories.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))
      )}
    </select>
  );
};
