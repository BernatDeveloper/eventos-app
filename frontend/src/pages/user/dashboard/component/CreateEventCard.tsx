import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/routes";
import { FiPlus } from "react-icons/fi";

export const CreateEventCard = () => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(ROUTES.createEvent)}
            className="custom-create-event-card group"
        >
            <FiPlus className="text-[var(--primary-color)] text-5xl mb-3 transition-transform duration-300 group-hover:rotate-90" />
            <span className="text-[var(--primary-color)] font-semibold text-[var(--font-size-large)]">
                Crear nuevo evento
            </span>
        </div>
    );
};
