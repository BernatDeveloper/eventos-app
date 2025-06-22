import { EventResponse, MyEventsResponse } from "../types/event";
import { Message } from "../types/message";
import api from "./api";

// Get my events
export const getMyEventsParticipation = async (): Promise<MyEventsResponse> => {
    try {
        const response = await api.get<MyEventsResponse>("/user/participating-events");

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Get event
export const getEvent = async (id: string): Promise<EventResponse> => {
    try {
        const response = await api.get<EventResponse>(`/events/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Create event
export const createEvent = async (newEvent: {
    location_id?: number | null;
    category_id?: number | null;
    title: string;
    description?: string;
    participant_limit?: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}): Promise<EventResponse> => {
    try {
        const response = await api.post<EventResponse>("/events", newEvent);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
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
}): Promise<EventResponse> => {
    try {
        const response = await api.put<EventResponse>(`/events/${id}`, updatedEvent);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Update event location
export const updateEventLocation = async (
    eventId: string,
    locationId: number | null
): Promise<Message> => {
    try {
        const response = await api.patch(`/events/${eventId}/locations`, {
            location_id: locationId,
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

// Delete event
export const deleteEvent = async (id: string): Promise<Message> => {
    try {
        const response = await api.delete(`/events/${id}`);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};