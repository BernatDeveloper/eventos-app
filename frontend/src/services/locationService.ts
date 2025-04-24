import { Location, UpdateLocationResponse } from "../types/location";
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

        if (!response.data) {
            return null;
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error creating location:\n\n${errorMessages}`);
        } else {
            throw new Error("Error creating location. Please try again.");
        }
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
): Promise<Location | null> => {
    try {
        const response = await api.put<Location>(`/locations/${id}`, updatedLocation);

        if (!response.data) {
            return null;
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => Array.isArray(messages) ? messages.join(", ") : messages)
                .join("\n");

            throw new Error(`Error updating location:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating location. Please try again.");
        }
    }
};

// Delete location
export const deleteLocation = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/locations/${id}`);
        return true;
    } catch (error: any) {
        if (error.response?.data?.error) {
            throw new Error(`Error deleting location:\n\n${error.response.data.error}`);
        } else {
            throw new Error("Error deleting location. Please try again.");
        }
    }
};