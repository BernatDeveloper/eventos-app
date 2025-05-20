import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { NotificationButton } from '../../../shared/notification/NotificationButton';
import { useAppSelector } from '../../../hooks/store';
import { DashboardLoader } from '../../../shared/loader/DashboardLoader';
import { EventsGrid } from './component/EventsGrid';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();
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
  }, [userLoading]);

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
        <EventsGrid
          events={joinedEvents}
          loading={loading}
          error={error}
          userId={user.id}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
};
