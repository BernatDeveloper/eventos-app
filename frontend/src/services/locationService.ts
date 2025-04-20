import { UpdateLoction } from "../types/location";
import api from "./api";

// Update location
export const updateLocation = async (
    id: number,
    updatedLocation: {
        name: string;
        latitude: number;
        longitude: number;
    }
): Promise<UpdateLoction | null> => {
    try {
        // Enviamos los datos al backend
        const response = await api.put<UpdateLoction>(`/locations/${id}`, updatedLocation);

        // Si no se recibe una respuesta adecuada
        if (!response.data) {
            console.warn("⚠️ No se pudo actualizar la ubicación.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        // Manejo de errores
        if (error.response && error.response.data.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${(messages)}`)

            alert(`❌ Error al actualizar la ubicación:\n\n${errorMessages}`);
        } else {
            // Si ocurre un error general
            alert("❌ Error al actualizar la ubicación. Intenta nuevamente.");
        }

        return null;
    }
};