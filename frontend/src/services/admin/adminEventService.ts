import api from "../api";

import { PaginatedEventsResponse } from "../../types/event";

export const getAllEvents = async (
    url: string = "/events",
    filters: string = ""
): Promise<PaginatedEventsResponse | null> => {
    try {
        const params = { title: filters };

        const response = await api.get<PaginatedEventsResponse>(url, {
            params,
        });

        if (!response.data) {
            console.warn("⚠️ La respuesta no contiene datos.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al obtener los eventos:", error.response?.data || error);
        return null;
    }
};

// Update event
export const updateEvent = async (id: string, updatedEvent: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    participant_limit?: number;
}): Promise<Event | null> => {
    try {
        const response = await api.put<Event>(`/events/${id}`, updatedEvent);

        if (!response.data) {
            console.warn("⚠️ No se pudo actualizar el evento.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        if (error.errors) {
            // Convertimos el objeto de errores en un mensaje legible
            const errorMessages = Object.entries(error.errors)
                .map(([, messages]) => `${(messages)}`)
                .join("\n");


            alert(`❌ Error al actualizar el evento:\n\n${errorMessages}`);
        } else {
            alert("❌ Error al actualizar el evento. Intenta nuevamente.");
        }

        return null;
    }

};


// Delete event
export const deleteEvent = async (id: string): Promise<boolean> => {
    try {
        const response = await api.delete(`/events/${id}`);

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
