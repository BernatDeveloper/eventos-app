import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { formatDate } from '../../../utils/formatData';
import { NotificationButton } from '../../../shared/notification/NotificationButton';
import { useAppSelector } from '../../../hooks/store';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fetchMyEventsParticipation } = useUserEvents();

  const { joinedEvents, loading, error } = useAppSelector((state) => state.events);

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

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
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
        <NotificationButton />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Mis eventos</h3>
        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            <div
              onClick={() => navigate(ROUTES.createEvent)}
              className="cursor-pointer border-2 border-dashed border-blue-400 rounded-lg p-6 w-full sm:w-[300px] h-[200px] flex items-center justify-center hover:bg-blue-50 transition"
            >
              <span className="text-blue-500 font-semibold text-lg">+ Crear nuevo evento</span>
            </div>

            {/* 🔹 Usamos joinedEvents desde Redux */}
            {joinedEvents.map((event) => (
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
