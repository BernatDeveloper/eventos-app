import { useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { Category, CategorySelectProps } from '../../types/category';
import { useAppSelector } from '../../hooks/store';
import { useTranslation } from 'react-i18next';

export const CategorySelect = ({
  categoryId,
  onChange,
  required = false
}: CategorySelectProps) => {
  const { fetchAllCategories } = useCategories();
  const { categories, loading } = useAppSelector(state => state.categories);
  const { t } = useTranslation('event')

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <select
      name="category_id"
      value={categoryId ?? ""}
      onChange={onChange}
      required={required}
      className="custom-input"
    >
      {loading ? (
        <option>{t('select_category.charging')}</option>
      ) : (
        <>
          <option disabled>
            {t('select_category.placeholder')}
          </option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {t(`select_category.category.${category.name.toLowerCase()}`)}
            </option>
          ))}
        </>
      )}
    </select>
  );
};
