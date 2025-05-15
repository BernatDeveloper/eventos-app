import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParticipants } from "../../hooks/useParticipant";
import { useAuth } from "../../hooks/useAuth";
import { useUserEvents } from "../../hooks/useUserEvents";
import { RemoveParticipantButton } from "./component/RemoveParticipantButton";
import BackToDashboard from "../redirect/BackToDashboard";
import { ProfileImage } from "../image/ProfileImage";
import { EventParticipantLoader } from "../loader/EventParticipantLoader";

export const EventParticipantsPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { fetchEventById, event } = useUserEvents();
    const { user } = useAuth();
    const { participants, removeParticipant, loading, error } = useParticipants(eventId!);

    useEffect(() => {
        if (eventId) fetchEventById(eventId);
    }, [eventId]);

    const isLoading = !user || !event || loading;

    if (!eventId) {
        return <p>Error: ID del evento no válido.</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <BackToDashboard />
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Participantes del evento
                </h1>

                {isLoading ? (
                    <EventParticipantLoader />
                ) : (
                    <ul className="space-y-4">
                        {participants.map((participant) => (
                            <li
                                key={participant.id}
                                className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <ProfileImage profileImage={participant.profile_image} size={60} />
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{participant.name}</p>
                                    <p className="text-sm text-gray-600">{participant.email}</p>
                                </div>
                                {user.id !== participant.id && user.id === event.creator_id && (
                                    <div className="ml-auto">
                                        <RemoveParticipantButton
                                            userId={participant.id}
                                            onRemove={removeParticipant}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};
