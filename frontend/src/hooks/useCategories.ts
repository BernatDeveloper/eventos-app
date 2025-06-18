import { useState } from "react";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updateEventCategory,
} from "../services/categoryService";
import {
  setCategories as setCategoriesRedux,
  setCategoriesLoaded,
  setCategoriesLoading,
  setCategoriesError,
  addCategory as addCategoryRedux,
  updateCategory as updateCategoryRedux,
  deleteCategory as deleteCategoryRedux
} from '../store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from "./store";
import { Category } from "../types/category";
import toast from "react-hot-toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector((state) => state.categories);

  const fetchAllCategories = async () => {
    setLoading(true);
    if (loaded) return;
    dispatch(setCategoriesLoading(true));
    try {
      const response = await getAllCategories();
      dispatch(setCategoriesRedux(response.categories));
      setCategories(response.categories);
    } catch (error: any) {
      dispatch(setCategoriesError(error.message));
      setError(error.message);
    } finally {
      dispatch(setCategoriesLoading(false));
      setLoading(false);
    }
  };

  const fetchCategoryById = async (id: number) => {
    setLoading(true);
    try {
      const response = await getCategory(id);
      setCategory(response.category);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (newCategory: {
    name: string;
    description?: string;
  }) => {
    setCreating(true);
    try {
      const response = await createCategory(newCategory);
      toast.success(response.message);
      dispatch(addCategoryRedux(response.category))
      dispatch(setCategoriesLoaded(false))
      fetchAllCategories(); // actualizar la lista
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateCategory = async (
    id: number,
    updatedCategory: {
      name: string;
      description?: string;
    }
  ) => {
    setUpdating(true);
    try {
      const response = await updateCategory(id, updatedCategory);
      toast.success(response.message);
      dispatch(updateCategoryRedux(response.category))
      dispatch(setCategoriesLoaded(false))
      fetchAllCategories(); // actualizar la lista
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setDeleting(true);
    try {
      const response = await deleteCategory(id);
      toast.success(response.message);
      dispatch(deleteCategoryRedux(id))
      dispatch(setCategoriesLoaded(false))
      fetchAllCategories(); // actualizar la lista
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateEventCategory = async (eventId: string, categoryId: number) => {
    try {
      const response = await updateEventCategory(eventId, categoryId);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    categories,
    category,
    loading,
    creating,
    updating,
    deleting,
    error,
    fetchAllCategories,
    fetchCategoryById,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleUpdateEventCategory
  };
};
