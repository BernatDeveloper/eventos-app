import api from "./api";

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

// Update event location
export const updateEventLocation = async (
    eventId: string,
    locationId: number | null
): Promise<boolean> => {
    try {
        const response = await api.patch(`/events/${eventId}/locations`, {
            location_id: locationId,
        });

        if (response.status === 200) {
            return true;
        }

        alert("❌ No se pudo actualizar la ubicación.");
        return false;
    } catch (error: any) {
        if (error.response?.status === 422 && error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => (Array.isArray(messages) ? messages.join(", ") : messages))
                .join("\n");

            alert(`❌ Error al actualizar la ubicación:\n\n${errorMessages}`);
        } else {
            alert("❌ Error al actualizar la ubicación. Intenta nuevamente.");
        }

        return false;
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