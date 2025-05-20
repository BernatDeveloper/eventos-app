import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getEventParticipants, removeEventParticipant } from "../services/participantService";
import { User } from "../types/user";

export const useParticipants = (eventId: string) => {
    const [participants, setParticipants] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchParticipants = async () => {
        try {
            setLoading(true);
            const data = await getEventParticipants(eventId);
            setParticipants(data.participants);
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeParticipant = async (userId: string) => {
        try {
            setLoading(true);
            const response = await removeEventParticipant(eventId, userId);
            await fetchParticipants();
            toast.success(response.message);
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch participants on mount
    useEffect(() => {
        if (eventId) {
            fetchParticipants();
        }
    }, [eventId]);

    return {
        participants,
        loading,
        error,
        removeParticipant,
    };
};
