import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/formatData';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { LocationMap } from '../../admin/location/components/LocationMap';
import { useAuth } from '../../../hooks/useAuth'; // Asumiendo que tienes este hook
import { CreatorLayout } from './layout/creator/CreatorLayout';
import { ViewerLayout } from './layout/viewer/ViewerLayout';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const { event, fetchEventById, loading, error } = useUserEvents();
    const { user } = useAuth(); // Usuario logueado

    useEffect(() => {
        if (id) {
            fetchEventById(id);
        }
    }, []);

    if (loading) return <p className="text-center text-gray-500 mt-10">Cargando evento...</p>;
    if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
    if (!event) return <p className="text-center text-gray-500">No se encontró el evento.</p>;

    const isCreator = user?.id === event.creator?.id;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">{event.title}</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>

            <div className="space-y-3 mb-6">
                <p><span className="font-semibold text-gray-800">Inicio:</span> {formatDate(event.start_date)} - {event.start_time}</p>
                <p><span className="font-semibold text-gray-800">Fin:</span> {formatDate(event.end_date)} - {event.end_time}</p>
            </div>

            {isCreator ? <CreatorLayout event={event} /> : <ViewerLayout event={event} />}
        </div>
    );
};

// Información compartida para ambos
export const SharedInfo = ({ event }: { event: any }) => (
    <>
        {event.creator && (
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Creador</h3>
                <p className="text-gray-700">{event.creator.name} ({event.creator.email})</p>
            </div>
        )}

        {event.category && (
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Categoría</h3>
                <p className="text-gray-700">{event.category.name} - {event.category.description}</p>
            </div>
        )}

        {event.location && (
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
                <p className="text-gray-700">{event.location.name}, {event.location.address}</p>
                <div className="mt-4 rounded overflow-hidden">
                    <LocationMap
                        latitude={Number(event.location.latitude)}
                        longitude={Number(event.location.longitude)}
                        interactive={false}
                    />
                </div>
                <a
                    href={`https://www.google.com/maps?q=${event.location.latitude},${event.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                    Ver en Google Maps
                </a>
            </div>
        )}

        <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold text-gray-900">Participación</h3>
            <p className="text-gray-700">Límite: {event.participant_limit}</p>
            <p className="text-gray-700">Registrados: {event.participants?.length} / {event.participant_limit}</p>
        </div>
    </>
);
