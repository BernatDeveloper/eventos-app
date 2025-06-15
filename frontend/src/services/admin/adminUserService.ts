import { Message } from "../../types/message";
import { AuthUserResponse, PaginatedUsersResponse, User } from "../../types/user";
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

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Get specific user data
export const getUser = async (id: string): Promise<User | null> => {
    try {
        const response = await api.get<User>(`/user/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Update user
export const updateUser = async (
    id: string,
    updatedUser: { name: string; role: string; user_type: string }
): Promise<AuthUserResponse> => {
    try {
        const response = await api.put<AuthUserResponse>(`/user/${id}/update`, updatedUser);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Delete user
export const deleteUser = async (id: string): Promise<Message> => {
    try {
        const response = await api.delete(`/user/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
