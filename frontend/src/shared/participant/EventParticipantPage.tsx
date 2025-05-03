import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParticipants } from "../../hooks/useParticipant";
import { useAuth } from "../../hooks/useAuth";
import { useUserEvents } from "../../hooks/useUserEvents";
import { RemoveParticipantButton } from "./component/RemoveParticipantButton";

export const EventParticipantsPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { fetchEventById, event } = useUserEvents();
    const { user } = useAuth();

    // 🛑 EARLY RETURN antes de llamar a cualquier hook dependiente de eventId
    if (!eventId) return <p>Error: ID del evento no válido.</p>;

    // ✅ Ahora es seguro usar el hook
    const { participants, removeParticipant, loading, error } = useParticipants(eventId);

    useEffect(() => {
        fetchEventById(eventId);
    }, [eventId]);

    if (!user) return <p>Cargando usuario...</p>;
    if (!event) return <p>Cargando datos del evento...</p>;
    if (loading) return <p>Cargando participantes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Participantes del evento</h1>
            <ul className="space-y-4">
                {participants.map((participant) => (
                    <li
                        key={participant.id}
                        className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div>
                            <p className="text-lg font-medium text-gray-900">{participant.name}</p>
                            <p className="text-sm text-gray-600">{participant.email}</p>
                        </div>
                        {user.id !== participant.id &&
                            (user.role === "admin" || user.id === event.creator_id) && (
                                <RemoveParticipantButton
                                    userId={participant.id}
                                    onRemove={removeParticipant}
                                />
                            )}
                    </li>
                ))}
            </ul>
        </div>

    );
};
