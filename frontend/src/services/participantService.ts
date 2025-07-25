import api from "./api";
import { ParticipantsResponse } from "../types/participant";

export const getEventParticipants = async (
  eventId: string
): Promise<ParticipantsResponse> => {
  try {
    const response = await api.get<ParticipantsResponse>(`/events/${eventId}/participants`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const removeEventParticipant = async (eventId: string, userId: string) => {
  try {
    const response = await api.delete(`/events/${eventId}/participants/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};