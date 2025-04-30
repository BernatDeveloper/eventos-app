export type InvitationStatus = "pending" | "accepted" | "rejected";

export interface Invitation {
  id: string;
  event_id: string;
  sender_id: string;
  recipient_id: string;
  status: InvitationStatus;
  created_at: string;
  updated_at: string;
}

export interface InvitationResponse {
    message: string;
    invitations: Invitation[];
}