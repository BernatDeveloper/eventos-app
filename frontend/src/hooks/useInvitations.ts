import { useState } from "react";
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
    setLoading(true);
    try {
      const result = await sendInvitation(eventId, recipientId);
      toast.success(result.message);
      fetchSent();
      return result;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: number) => {
    setLoading(true);
    try {
      const response = await acceptInvitation(invitationId);
      toast.success(response);
      fetchReceived();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectInvitation = async (invitationId: number) => {
    setLoading(true);
    try {
      const response = await rejectInvitation(invitationId);
      toast.success(response);
      fetchReceived();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
