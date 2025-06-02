import { Category, CategoryResponse, CategoriesResponse } from "../types/category";
import { Message } from "../types/message";
import api from "./api";

// Get all categories
export const getAllCategories = async (): Promise<CategoriesResponse> => {
    try {
        const response = await api.get<CategoriesResponse>("/event-categories");

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Get one category
export const getCategory = async (id: number): Promise<CategoryResponse> => {
    try {
        const response = await api.get<CategoryResponse>(`/event-categories/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Create a category
export const createCategory = async (category: Omit<Category, "id">): Promise<CategoryResponse> => {
    try {
        const response = await api.post<CategoryResponse>("/event-categories", category);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Update a category
export const updateCategory = async (id: number, category: Omit<Category, "id">): Promise<CategoryResponse> => {
    try {
        const response = await api.put<CategoryResponse>(`/event-categories/${id}`, category);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
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

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Delete a category
export const deleteCategory = async (id: number): Promise<Message> => {
    try {
        const response = await api.delete<Message>(`/event-categories/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
