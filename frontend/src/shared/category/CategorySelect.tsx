import { useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { Category, CategorySelectProps } from '../../types/category';
import { useAppSelector } from '../../hooks/store';

export const CategorySelect = ({ categoryId, onChange, required = false }: CategorySelectProps) => {
  const { fetchAllCategories } = useCategories();
  const { categories, loading } = useAppSelector(state => state.categories);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <select
      name="category_id"
      value={categoryId}
      onChange={onChange}
      required={required}
      className="border p-2 rounded bg-white w-[fit-content] cursor-pointer"
    >
      {loading ? (
        <option disabled>Cargando categorías...</option>
      ) : (
        <>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </>
      )}

    </select>
  );
};
