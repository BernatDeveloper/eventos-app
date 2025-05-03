import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../../routes/routes";

export const ShowParticipantsSection = ({ eventId }: { eventId: string }) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer hover:bg-gray-200 sm:col-span-1"
            onClick={() => navigate(ROUTES.participant.replace(':eventId', eventId))} // Reemplaza el :eventId en la ruta
        >
            <h4 className="text-lg font-semibold mb-2 text-primary">Participantes</h4>
            <p className="text-sm text-gray-700 mb-3"></p>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                Invitar
            </button>
        </div>
    );
};
