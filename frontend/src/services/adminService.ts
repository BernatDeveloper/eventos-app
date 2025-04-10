import { PaginatedUsersResponse, User } from "../types/user";
import api from "./api";

export const getAllUsers = async (url: string = '/users', filters: string = ''): Promise<PaginatedUsersResponse | null> => {
    try {
        const filter = { name: filters };
        const response = await api.get<PaginatedUsersResponse>(url, {
            params: filter,
        });

        if (!response.data) {
            console.warn("⚠️ La respuesta no contiene datos.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al obtener los usuarios:", error.response?.data || error);
        return null;
    }
};

// Obtener los datos de un usuario específico
export const getUser = async (id: string): Promise<User | null> => {
    try {
        const response = await api.get<User>(`/user/${id}`);

        if (!response.data) {
            console.warn("⚠️ La respuesta no contiene datos.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al obtener el usuario:", error.response?.data || error);
        return null;
    }
};

// Crear un nuevo usuario
export const createUser = async (newUser: { name: string; email: string; role: string; user_type: string }): Promise<User | null> => {
    try {
        const response = await api.post<User>('/users', newUser);

        if (!response.data) {
            console.warn("⚠️ No se pudo crear el usuario.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al crear el usuario:", error.response?.data || error);
        return null;
    }
};

// Editar el usuario completo
export const updateUser = async (id: string, updatedUser: { name: string; role: string; user_type: string }): Promise<User | null> => {
    try {
        const response = await api.put<User>(`/user/${id}/update`, updatedUser);

        if (!response.data) {
            console.warn("⚠️ No se pudo actualizar el usuario.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al actualizar el usuario:", error.response?.data || error);
        return null;
    }
};


// Eliminar usuario
export const deleteUser = async (id: string): Promise<boolean> => {
    try {
        const response = await api.delete(`/user/${id}`);

        if (response.status !== 200) {
            console.warn("⚠️ No se pudo eliminar el usuario.");
            return false;
        }

        return true;
    } catch (error: any) {
        console.error("❌ Error al eliminar el usuario:", error.response?.data || error);
        return false;
    }
};