import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { CategorySelect } from "../../../../../../shared/category/CategorySelect";
import { useCategories } from "../../../../../../hooks/useCategories";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/store";
import { updateEventCategory } from "../../../../../../store/slices/eventSlice";
import { useTranslation } from "react-i18next";

interface EditCategorySectionProps {
    eventId: string;
    currentCategoryId: number;
}

export const EditCategorySection = ({
    eventId,
    currentCategoryId,
}: EditCategorySectionProps) => {
    const [selectedCategory, setSelectedCategory] = useState(currentCategoryId);
    const [loading, setLoading] = useState(false);
    const { handleUpdateEventCategory } = useCategories();
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(state => state.categories);
    const { t } = useTranslation('event');


    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategoryId = Number(e.target.value);
        setSelectedCategory(newCategoryId);
        const selectedCategoryObj = categories.find(cat => cat.id === newCategoryId);
        if (!selectedCategoryObj) return;

        setLoading(true);
        try {
            await handleUpdateEventCategory(eventId, newCategoryId);
            dispatch(updateEventCategory({ eventId, category: selectedCategoryObj }));
        } catch (err) {
            // El error ya está gestionado dentro del hook
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="custom-creator-section"
            aria-label="Editar categoría"
        >
            <h4 className="text-xl font-bold text-[var(--primary-color)] mb-2">{t('creator.categories.title')}</h4>
            <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">
                {t('creator.categories.desc')}
            </p>

            {loading
                ?
                <p className="text-[var(--primary-color)] mt-2 font-semibold">{t('creator.categories.loader')}</p>
                :
                <CategorySelect
                    categoryId={selectedCategory}
                    onChange={handleChange}
                    required
                />
            }

            <MdCategory
                className="absolute bottom-2 right-2 text-[8rem] rotate-12 pointer-events-none select-none opacity-20 text-[var(--primary-color)]"
                aria-hidden="true"
            />
        </div>
    );
};
