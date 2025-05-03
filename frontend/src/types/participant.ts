import { User } from "./user";

export interface ParticipantsResponse {
  message: string;
  participants: User[];
}

export interface RemoveParticipantButtonProps {
  userId: string;
  onRemove: (userId: string) => Promise<void>;
}