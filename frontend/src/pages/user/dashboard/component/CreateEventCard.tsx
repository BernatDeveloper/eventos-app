import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/routes";

export const CreateEventCard = () => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(ROUTES.createEvent)}
            className="cursor-pointer border-2 border-dashed border-blue-400 rounded-lg p-6 w-[360px] h-[200px] flex items-center justify-center hover:bg-blue-50 transition"
        >
            <span className="text-blue-500 font-semibold text-lg">+ Crear nuevo evento</span>
        </div>
    );
};
