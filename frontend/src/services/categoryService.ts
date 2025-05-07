import { Category, CategoryResponse, CategoriesResponse } from "../types/category";
import { Message } from "../types/message";
import api from "./api";

// Get all categories
export const getAllCategories = async (): Promise<CategoriesResponse> => {
    try {
        const response = await api.get<CategoriesResponse>("/event-categories");

        if (!response.data) {
            throw new Error("No se pudieron obtener las categorías.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al obtener las categorías. Intenta nuevamente.");
    }
};

// Get one category
export const getCategory = async (id: number): Promise<CategoryResponse> => {
    try {
        const response = await api.get<CategoryResponse>(`/event-categories/${id}`);

        if (!response.data) {
            throw new Error("No se pudo obtener la categoría.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al obtener la categoría. Intenta nuevamente.");
    }
};

// Create a category
export const createCategory = async (category: Omit<Category, "id">): Promise<CategoryResponse> => {
    try {
        const response = await api.post<CategoryResponse>("/event-categories", category);

        if (!response.data) {
            throw new Error("No se pudo crear la categoría.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al crear la categoría. Intenta nuevamente.");
    }
};

// Update a category
export const updateCategory = async (id: number, category: Omit<Category, "id">): Promise<CategoryResponse> => {
    try {
        const response = await api.put<CategoryResponse>(`/event-categories/${id}`, category);

        if (!response.data) {
            throw new Error("No se pudo actualizar la categoría.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al actualizar la categoría. Intenta nuevamente.");
    }
};

// Update event category
export const updateEventCategory = async (
    eventId: string,
    categoryId: number
): Promise<CategoryResponse> => {
    try {
        const response = await api.patch<CategoryResponse>(`/events/${eventId}/category`, {
            category_id: categoryId,
        });

        if (!response.data) {
            throw new Error("No se pudo actualizar la categoría del evento.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al actualizar la categoría del evento. Intenta nuevamente.");
    }
};

// Delete a category
export const deleteCategory = async (id: number): Promise<Message> => {
    try {
        const response = await api.delete<Message>(`/event-categories/${id}`);

        if (!response.data) {
            throw new Error("No se pudo eliminar la categoría.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al eliminar la categoría. Intenta nuevamente.");
    }
};
