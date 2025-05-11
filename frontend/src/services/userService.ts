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

// Get users by name, excluding those already in the event
export const searchUsersByName = async (name: string, eventId: string): Promise<UsersResponse> => {
    try {
        const response = await api.get<UsersResponse>(`/user/search-by-name`, {
            params: { name, event_id: eventId }
        });

        if (!response.data || !response.data.users) {
            throw new Error("No users found");
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error finding users:\n\n${errorMessages}`);
        } else {
            throw new Error("Error finding users. Please try again.");
        }
    }
};

// Editar el nombre de usuario
export const updateUsername = async (name: string): Promise<AuthUserResponse> => {
    try {
        const response = await api.patch<AuthUserResponse>(`/user/update-name`, { name });

        if (!response.data) {
            throw new Error("No se pudo actualizar la imagen de perfil.");
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error updating username:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating username. Please try again.");
        }
    }
};

// Editar la imagen de perfil
export const updateProfileImage = async (formData: FormData): Promise<AuthUserResponse> => {
    console.log(formData)
    try {
        const response = await api.post<AuthUserResponse>("/user/update-image",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );

        if (!response.data) {
            throw new Error("No se pudo actualizar la imagen de perfil.");
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error updating user profile image:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating user profile image. Please try again.");
        }
    }
};

// Editar la contraseña
export const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
        const response = await api.patch("/user/update-password", { oldPassword, newPassword });

        if (response.status !== 200) {
            throw new Error("No se pudo actualizar la contraseña.");
        }

        return true;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error updating user password:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating user password. Please try again.");
        }
    }
};