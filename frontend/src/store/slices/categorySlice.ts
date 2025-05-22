import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/category';

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    loaded: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
    loaded: false,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
            state.loaded = true;
        },
        addCategory(state, action: PayloadAction<Category>) {
            state.categories.push(action.payload);
        },
        updateCategory(state, action: PayloadAction<Category>) {
            const updated = action.payload;
            const index = state.categories.findIndex(c => c.id === updated.id);
            if (index !== -1) {
                state.categories[index] = updated;
            }
        },
        deleteCategory(state, action: PayloadAction<number>) {
            state.categories = state.categories.filter(c => c.id !== action.payload);
        },
        setCategoriesLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        resetCategoriesState(state) {
            state.categories = [];
            state.loading = false;
            state.error = null;
            state.loaded = false;
        },
        setCategoriesError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setCategoriesLoaded(state, action: PayloadAction<boolean>) {
            state.loaded = action.payload;
        },
    },
});

export const {
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    setCategoriesLoading,
    resetCategoriesState,
    setCategoriesError,
    setCategoriesLoaded,
} = categorySlice.actions;

export default categorySlice.reducer;
