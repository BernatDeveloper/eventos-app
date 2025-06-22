import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useParticipants } from "../../hooks/useParticipant";
import { useAuth } from "../../hooks/useAuth";
import { useUserEvents } from "../../hooks/useUserEvents";
import { RemoveParticipantButton } from "./component/RemoveParticipantButton";
import BackToDashboard from "../redirect/BackToDashboard";
import { ProfileImage } from "../image/ProfileImage";
import { EventParticipantLoader } from "../loader/EventParticipantLoader";
import { useTranslation } from "react-i18next";

export const EventParticipantsPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { fetchEventById, event } = useUserEvents();
    const { user } = useAuth();
    const { participants, removeParticipant, loading, error } = useParticipants(eventId!);
    const { t } = useTranslation('event');

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
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {t('event_participants.title')}
                </h1>

                {isLoading ? (
                    <EventParticipantLoader />
                ) : (
                    <ul className="space-y-4">
                        {participants.map((participant) => (
                            <li
                                key={participant.id}
                                className="bg-[var(--background-secondary-color)] shadow-md rounded-xl p-4 border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4"
                            >
                                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4 sm:flex-1 gap-2">
                                    <ProfileImage profileImage={participant.profile_image} size={60} />

                                    <div className="text-center sm:text-left break-words">
                                        <p className="text-lg font-medium text-[var(--text-primary-color)]">{participant.name}</p>
                                        <p className="text-sm text-[var(--text-secondary-color)]">{participant.email}</p>
                                    </div>
                                </div>

                                {user.id !== participant.id && user.id === event.creator_id && (
                                    <div className="flex justify-center sm:justify-end">
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
