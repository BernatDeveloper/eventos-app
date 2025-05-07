import { useNavigate } from "react-router-dom";
import { SharedInfo } from "../../EventPage";
import { ROUTES } from "../../../../../routes/routes";

export const ViewerLayout = ({ event }: { event: any }) => {
    const navigate = useNavigate()

    return (
        <>
            <p className="text-gray-600 italic mb-4">Estás viendo este evento como invitado.</p>
            <button
                onClick={() => navigate(ROUTES.participant.replace(':eventId', event.id))}
                className="px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-xl transition duration-200 shadow-sm"
                title="View participants"
            >
                🚹 Participantes
            </button>
            <SharedInfo event={event} />
        </>
    )
};