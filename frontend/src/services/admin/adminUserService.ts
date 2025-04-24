import { PaginatedUsersResponse, User } from "../../types/user";
import api from "../api";

// Get all users
export const getAllUsers = async (
    url: string = '/users',
    filters: string = ''
): Promise<PaginatedUsersResponse | null> => {
    try {
        const filter = { email: filters };
        const response = await api.get<PaginatedUsersResponse>(url, {
            params: filter,
        });

        if (!response.data) {
            throw new Error("No users data found.");
        }

        return response.data;
    } catch (error: any) {
        throw new Error("Error fetching users. Please try again.");
    }
};

// Get specific user data
export const getUser = async (id: string): Promise<User | null> => {
    try {
        const response = await api.get<User>(`/user/${id}`);

        if (!response.data) {
            throw new Error("User not found.");
        }

        return response.data;
    } catch (error: any) {
        throw new Error("Error fetching user. Please try again.");
    }
};

// Update user
export const updateUser = async (
    id: string,
    updatedUser: { name: string; role: string; user_type: string }
): Promise<User | null> => {
    try {
        const response = await api.put<User>(`/user/${id}/update`, updatedUser);

        if (!response.data) {
            throw new Error("User update failed.");
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${(messages)}`)
                .join("\n");

            throw new Error(`Error updating user:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating user. Please try again.");
        }
    }
};

// Delete user
export const deleteUser = async (id: string): Promise<boolean> => {
    try {
        const response = await api.delete(`/user/${id}`);

        if (response.status !== 200) {
            throw new Error("User deletion failed.");
        }

        return true;
    } catch (error: any) {
        throw new Error("Error deleting user. Please try again.");
    }
};
