import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { CategorySelect } from "../../../../../../shared/category/CategorySelect";
import { useCategories } from "../../../../../../hooks/useCategories";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/store";
import { updateEventCategory } from "../../../../../../store/slices/eventSlice";

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
            className="relative rounded-xl p-6 shadow-md transition flex flex-col
                 bg-gradient-to-l from-green-400 via-blue-400 to-purple-400
                 hover:from-green-500 hover:via-blue-500 hover:to-purple-500"
            aria-label="Editar categoría"
        >
            <h4 className="text-xl font-bold text-white mb-2">Editar categoría</h4>
            <p className="text-white/90 mb-5 flex-grow">
                Cambia la categoría del evento.
            </p>

            {loading
                ?
                <p className="text-white mt-2 font-semibold">Guardando cambios...</p>
                :
                <CategorySelect
                    categoryId={selectedCategory}
                    onChange={handleChange}
                    required
                />
            }

            <MdCategory
                className="absolute bottom-1 right-0 text-[8rem] rotate-12 pointer-events-none select-none gradient-text opacity-30"
                aria-hidden="true"
            />
        </div>
    );
};
