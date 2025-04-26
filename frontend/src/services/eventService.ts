import { EventResponse, MyEventsResponse } from "../types/event";
import api from "./api";

// Get my events
export const getMyEventsParticipation = async (): Promise<MyEventsResponse> => {
    try {
        const response = await api.get<MyEventsResponse>("/user/participating-events");

        if (!response.data) {
            throw new Error("No se pudieron obtener tus eventos.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al obtener tus eventos. Intenta nuevamente.");
    }
};

// Get event
export const getEvent = async (id: string): Promise<EventResponse> => {
    try {
      const response = await api.get<EventResponse>(`/events/${id}`);
  
      if (!response.data) {
        throw new Error("No se pudo obtener el evento.");
      }

      console.log(response)
  
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([, messages]) => `${messages}`)
          .join("\n");
        throw new Error(errorMessages);
      }
  
      throw new Error("Error al obtener el evento. Intenta nuevamente.");
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
}): Promise<Event> => {
    try {
        const response = await api.put<Event>(`/events/${id}`, updatedEvent);

        if (!response.data) {
            throw new Error("No se pudo actualizar el evento.");
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) => `${messages}`)
                .join("\n");
            throw new Error(errorMessages);
        }

        throw new Error("Error al actualizar el evento. Intenta nuevamente.");
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

        throw new Error("Failed to update location.");
    } catch (error: any) {
        if (error.response?.status === 422 && error.response?.data?.errors) {
            const errorMessages = Object.entries(error.response.data.errors)
                .map(([, messages]) =>
                    Array.isArray(messages) ? messages.join(", ") : messages
                )
                .join("\n");

            throw new Error(`Error updating location:\n\n${errorMessages}`);
        } else {
            throw new Error("Error updating location. Please try again.");
        }
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