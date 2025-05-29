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
            className="custom-creator-section"
            aria-label="Ver participantes"
        >
            <h4 className="text-xl font-bold mb-2 text-[var(--primary-color)]">Participantes</h4>
            <p className="text-[var(--text-secondary-color)] mb-5 flex-grow">{`${participants} / ${limit}`}</p>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(ROUTES.participant.replace(":eventId", eventId));
                }}
                className="cursor-pointer self-start px-4 py-2 text-sm rounded-lg font-semibold transition 
                   bg-[var(--primary-color)] text-white hover:opacity-90 focus:outline-none 
                   focus:ring-2 focus:ring-[var(--primary-color)]"
            >
                Ver lista
            </button>

            <MdGroup
                className="absolute bottom-2 right-2 text-[8rem] rotate-12 pointer-events-none select-none opacity-20 text-[var(--primary-color)]"
                aria-hidden="true"
            />
        </div>
    );
};
