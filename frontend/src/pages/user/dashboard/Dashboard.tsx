import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { formatDate } from '../../../utils/formatData';
import { NotificationButton } from '../../../shared/notification/NotificationButton';
import { useAppSelector } from '../../../hooks/store';
import { DashboardLoader } from '../../../shared/loader/DashboardLoader';
import { DashboardEventsLoader } from '../../../shared/loader/DashboardEventsLoader';
import { getEventCategory } from '../../../utils/categoriesDetails';
import { FaCrown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation()
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const { fetchMyEventsParticipation } = useUserEvents();

  const { joinedEvents, loading, error } = useAppSelector((state) => state.events);

  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        navigate(ROUTES.login);
      } else {
        fetchMyEventsParticipation();
      }
    }
  }, [loading, user]);

  if (userLoading) return <DashboardLoader />;
  if (!user) return null;

  const redirectToProfile = () => {
    navigate(ROUTES.profile);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">{t("welcome")}, {user.name}</h2>

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
          <DashboardEventsLoader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-start">
            <div
              onClick={() => navigate(ROUTES.createEvent)}
              className="cursor-pointer border-2 border-dashed border-blue-400 rounded-lg p-6 w-[360px] h-[200px] flex items-center justify-center hover:bg-blue-50 transition"
            >
              <span className="text-blue-500 font-semibold text-lg">+ Crear nuevo evento</span>
            </div>

            {joinedEvents.map((event) => {
              const categoryName = event.category?.name || "Other";
              const category = getEventCategory(categoryName);
              const Icon = category.icon;

              const isCreator = event.creator_id === user.id;

              return (
                <div
                  key={event.id}
                  className={`relative cursor-pointer rounded-xl overflow-hidden p-6 shadow-md transition flex flex-col bg-gradient-to-l ${category.color1} ${category.color2} hover:opacity-90 w-[360px] h-[200px]`}
                  onClick={() => handleEventClick(event.id)}
                  aria-label={`Evento ${event.title}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCreator && (
                      <div
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
                        title="Creator"
                      >
                        <FaCrown className="text-yellow-400 text-xl" />
                      </div>
                    )}
                    <h4 className="text-xl font-bold text-white">{event.title}</h4>
                  </div>

                  <p className="text-white/90 mb-5 flex-grow line-clamp-3">{event.description}</p>

                  <div className="text-white text-sm mb-3">
                    <p>
                      Desde: {formatDate(event.start_date)} - {event.start_time}
                    </p>
                    <p>
                      Hasta: {formatDate(event.end_date)} - {event.end_time}
                    </p>
                  </div>

                  <Icon
                    className={`absolute top-18 left-50 text-[10rem] ${category.colorIcon} rotate-12 pointer-events-none select-none opacity-30`}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
