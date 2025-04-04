import { User } from "../types/user";
import api from "./api";


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

// Editar el nombre de usuario
export const updateUsername = async (id: string, name: string): Promise<User | null> => {
    try {
        const response = await api.patch<User>(`/user/${id}/update-name`, { name });

        if (!response.data) {
            console.warn("⚠️ No se pudo actualizar el nombre.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al actualizar el nombre de usuario:", error.response?.data || error);
        return null;
    }
};

// Eliminar usuario
export const deleteUser = async (): Promise<boolean> => {
    try {
        const response = await api.delete("/user/delete");

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