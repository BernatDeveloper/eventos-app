import { useState } from "react";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updateEventCategory,
} from "../services/categoryService";
import { Category } from "../types/category";
import toast from "react-hot-toast";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updatingEventCategory, setUpdatingEventCategory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories();
      setCategories(response.categories || []);
    } catch (error) {
      setError("Error al cargar las categorías.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryById = async (id: number) => {
    setLoading(true);
    try {
      const response = await getCategory(id);
      setCategory(response.category);
    } catch (error) {
      setError("Error al cargar la categoría.");
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
      fetchAllCategories(); // actualizar la lista
    } catch (error) {
      toast.error("Error al crear la categoría.");
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
      fetchAllCategories(); // actualizar la lista
    } catch (error) {
      toast.error("Error al actualizar la categoría.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setDeleting(true);
    try {
      const response = await deleteCategory(id);
      toast.success(response.message);
      fetchAllCategories(); // actualizar la lista
    } catch (error) {
      toast.error("Error al eliminar la categoría.");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateEventCategory = async (eventId: string, categoryId: number) => {
    setUpdatingEventCategory(true);
    try {
      const response = await updateEventCategory(eventId, categoryId);
      toast.success(response.message || "Categoría del evento actualizada con éxito.");
    } catch (error) {
      toast.error("Error al actualizar la categoría del evento.");
    } finally {
      setUpdatingEventCategory(false);
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
