import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { formatDate } from '../../../utils/formatData';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { events, loading, error, fetchMyEventsParticipation } = useUserEvents()

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.login);
    } else {
      fetchMyEventsParticipation();
    }
  }, []);

  if (!user) return null;

  const redirectToProfile = () => {
    navigate(ROUTES.profile);
  };
  
  const redirectToNotification = () => {
    navigate(ROUTES.notification);
  };

  // Función para redirigir al detalle del evento
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`); // Redirige a la página del evento con el ID
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Bienvenido, {user.name}!</h2>

      <div className="mt-8">
        <button
          onClick={redirectToProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Ir al perfil
        </button>
        <button
          onClick={redirectToNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Notifications
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Mis eventos</h3>
        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {/* Tarjeta de Crear evento */}
            <div
              onClick={() => navigate(ROUTES.createEvent)}
              className="cursor-pointer border-2 border-dashed border-blue-400 rounded-lg p-6 w-full sm:w-[300px] h-[200px] flex items-center justify-center hover:bg-blue-50 transition"
            >
              <span className="text-blue-500 font-semibold text-lg">+ Crear nuevo evento</span>
            </div>

            {/* Tarjetas de eventos */}
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg shadow p-4 w-full sm:w-[300px] h-[200px] flex flex-col justify-between cursor-pointer"
                onClick={() => handleEventClick(event.id)}
              >
                <div>
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </div>
                <div className="text-sm mt-2 text-gray-700">
                  <p>
                    Desde: {formatDate(event.start_date)} - {event.start_time}
                  </p>
                  <p>
                    Hasta: {formatDate(event.end_date)} - {event.end_time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

};
