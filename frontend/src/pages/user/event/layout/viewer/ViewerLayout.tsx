import { useNavigate } from "react-router-dom";
import { SharedInfo } from "../component/SharedInfo";
import { EventSharedInfoLoader } from "../../../../../shared/loader/EventSharedInfoLoader";
import { ROUTES } from "../../../../../routes/routes";
import { Event } from "../../../../../types/event";

export const ViewerLayout = ({ event }: { event: Event | null }) => {
    const navigate = useNavigate();

    if (!event) {
        return <EventSharedInfoLoader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-gray-500 italic">
                    Estás viendo este evento como invitado.
                </p>
                <button
                    onClick={() => navigate(ROUTES.participant.replace(':eventId', event.id))}
                    className="primary-button"
                    title="Ver participantes"
                >
                    Ver participantes
                </button>
            </div>

            <SharedInfo event={event} />
        </div>
    );
};
