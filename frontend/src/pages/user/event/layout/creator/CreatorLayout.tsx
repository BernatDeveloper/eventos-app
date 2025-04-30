import { SharedInfo } from "../../EventPage";

export const CreatorLayout = ({ event }: { event: any }) => (
    <>
        <p className="text-blue-700 font-semibold mb-4">Eres el creador de este evento</p>
        <button className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Editar evento
        </button>

        {/* Podrías incluir más herramientas de administración aquí */}
        <SharedInfo event={event} />
    </>
);