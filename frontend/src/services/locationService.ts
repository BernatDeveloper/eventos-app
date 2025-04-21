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
            console.warn("⚠️ No se pudo crear la ubicación.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${(messages)}`)

            alert(`❌ Error al crear la ubicación:\n\n${errorMessages}`);
        } else {
            alert("❌ Error al crear la ubicación. Intenta nuevamente.");
        }

        return null;
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
            console.warn("⚠️ No se pudo actualizar la ubicación.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${(messages)}`)

            alert(`❌ Error al actualizar la ubicación:\n\n${errorMessages}`);
        } else {
            alert("❌ Error al actualizar la ubicación. Intenta nuevamente.");
        }

        return null;
    }
};

// Delete location
export const deleteLocation = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/locations/${id}`);
        return true;
    } catch (error: any) {
        if (error.response && error.response.data.error) {
            alert(`❌ Error al eliminar la ubicación:\n\n${error.response.data.error}`);
        } else {
            alert("❌ Error al eliminar la ubicación. Intenta nuevamente.");
        }

        return false;
    }
};