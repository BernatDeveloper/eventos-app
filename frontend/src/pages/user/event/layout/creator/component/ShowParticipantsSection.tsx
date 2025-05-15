import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../../routes/routes";
import { ShowParticipantsSectionProps } from "../../../../../../types/participant";
import { MdGroup } from "react-icons/md";

export const ShowParticipantsSection = ({
    eventId,
    participants,
    limit,
}: ShowParticipantsSectionProps) => {
    const navigate = useNavigate();

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(ROUTES.participant.replace(":eventId", eventId))}
            className="relative z-0 cursor-pointer rounded-xl p-6 transition flex flex-col overflow-hidden
                 bg-gradient-to-l from-purple-500 to-emerald-400 hover:from-purple-600 hover:to-emerald-500 shadow-md hover:shadow-lg"
            aria-label="Ver participantes"
        >
            <h4 className="text-xl font-bold text-white mb-2">Participantes</h4>
            <p className="text-white mb-5 flex-grow">{`${participants} / ${limit}`}</p>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(ROUTES.participant.replace(":eventId", eventId));
                }}
                className="cursor-pointer self-start px-4 py-2 bg-white text-purple-700 hover:bg-gray-100 rounded-lg font-semibold transition focus:outline-none focus:ring-purple-500"
            >
                Ver lista
            </button>

            <MdGroup
                className="absolute bottom-1 right-0 text-[8rem] rotate-12 pointer-events-none select-none gradient-text opacity-30"
                aria-hidden="true"
            />
        </div>
    );
};
