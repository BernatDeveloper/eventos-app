import api from "./api";
import { AuthUserResponse, User, UsersResponse } from "../types/user";

// Obtener los datos del usuario autenticado con el token pasado como parámetro
export const getAuthUser = async (): Promise<User | null> => {
    try {
        const response = await api.get<AuthUserResponse>("/me");

        return response.data.user;
    } catch (error: any) {
        console.error("❌ Error al obtener el usuario autenticado:", error.response?.data || error);
        return null;
    }
};

// Get users by name
export const searchUsersByName = async (name: string): Promise<UsersResponse> => {
    try {
        const response = await api.get<UsersResponse>(`/user/search-by-name`, {
            params: { name }
        });
        console.log(response)

        if (!response.data || !response.data.users) {
            throw new Error("Any users found");
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error founding users:\n\n${errorMessages}`);
        } else {
            throw new Error("Error founding users. Please try again.");
        }
    }
};

// Editar el nombre de usuario
export const updateUsername = async (name: string): Promise<User | null> => {
    try {
        const response = await api.patch<User>(`/user/update-name`, { name });

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

// Editar la imagen de perfil
export const updateProfileImage = async (imageUrl: string): Promise<User | null> => {
    try {
        const response = await api.patch<User>("/user/update-image", { profile_image: imageUrl });

        if (!response.data) {
            console.warn("⚠️ No se pudo actualizar la imagen.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al actualizar la imagen de perfil:", error.response?.data || error);
        return null;
    }
};

// Editar la contraseña
export const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
        const response = await api.patch("/user/update-password", { oldPassword, newPassword });

        if (response.status !== 200) {
            console.warn("⚠️ No se pudo actualizar la contraseña.");
            return false;
        }

        return true;
    } catch (error: any) {
        console.error("❌ Error al actualizar la contraseña:", error.response?.data || error);
        return false;
    }
};