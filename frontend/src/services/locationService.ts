import { UpdateLocationResponse } from "../types/location";
import { Message } from "../types/message";
import api from "./api";

// Store location
export const storeLocation = async (
    newLocation: {
        name: string;
        address?: string;
        latitude?: number;
        longitude?: number;
    }
): Promise<UpdateLocationResponse | null> => {
    try {
        const response = await api.post<UpdateLocationResponse>("/locations", newLocation);

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Update location
export const updateLocation = async (
    id: number,
    updatedLocation: {
        name: string;
        latitude: number;
        longitude: number;
    }
): Promise<UpdateLocationResponse | null> => {
    try {
        const response = await api.put<UpdateLocationResponse>(`/locations/${id}`, updatedLocation);

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Delete location
export const deleteLocation = async (id: number): Promise<Message> => {
    try {
        const response = await api.delete(`/locations/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};