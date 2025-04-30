import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  getSentInvitations,
  getReceivedInvitations,
} from "../services/invitationService";
import { Invitation } from "../types/invitation";

export const useInvitations = () => {
  const [sentInvitations, setSentInvitations] = useState<Invitation[]>([]);
  const [receivedInvitations, setReceivedInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSent = async () => {
    try {
      const data = await getSentInvitations();
      setSentInvitations(data.invitations);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchReceived = async () => {
    try {
      const data = await getReceivedInvitations();
      setReceivedInvitations(data.invitations);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSendInvitation = async (eventId: string, recipientId: string) => {
    try {
      const result = await sendInvitation(eventId, recipientId);
      toast.success("Invitación enviada correctamente.");
      fetchSent();
      return result;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await acceptInvitation(invitationId);
      toast.success("Invitación aceptada.");
      fetchReceived();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await rejectInvitation(invitationId);
      toast.success("Invitación rechazada.");
      fetchReceived();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    sentInvitations,
    receivedInvitations,
    loading,
    handleSendInvitation,
    handleAcceptInvitation,
    handleRejectInvitation,
    fetchSent,
    fetchReceived,
  };
};
