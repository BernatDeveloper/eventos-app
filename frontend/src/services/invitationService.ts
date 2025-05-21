import api from "./api";
import { Invitation, InvitationResponse } from "../types/invitation";

// Send invitation to user
export const sendInvitation = async (
  eventId: string,
  recipientId: string
): Promise<{ message: string, invitation: Invitation }> => {
  try {
    const response = await api.post("/event-invitations", {
      event_id: eventId,
      recipient_id: recipientId,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Accept invitation
export const acceptInvitation = async (
  invitationId: number
): Promise<string> => {
  try {
    const response = await api.put(`/event-invitations/${invitationId}/accept`);
    return response.data.message;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Reject invitation
export const rejectInvitation = async (
  invitationId: number
): Promise<string> => {
  try {
    const response = await api.put(`/event-invitations/${invitationId}/reject`);
    return response.data.message;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Get sended invitations of user
export const getSentInvitations = async (): Promise<InvitationResponse> => {
  try {
    const response = await api.get("/event-invitations/sent");
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get recibed invitations of user
export const getReceivedInvitations = async (): Promise<InvitationResponse> => {
  try {
    const response = await api.get("/event-invitations/received");
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
