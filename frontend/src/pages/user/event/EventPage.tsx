import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { useAuth } from '../../../hooks/useAuth';
import { CreatorLayout } from './layout/creator/CreatorLayout';
import { ViewerLayout } from './layout/viewer/ViewerLayout';
import BackToDashboard from '../../../shared/redirect/BackToDashboard';
import { EventSharedInfoLoader } from '../../../shared/loader/EventSharedInfoLoader';
import { ROUTES } from '../../../routes/routes';
import { useAppDispatch } from '../../../hooks/store';
import { setEventsLoaded } from '../../../store/slices/eventSlice';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const { event, fetchEventById, loading } = useUserEvents();
    const { user } = useAuth();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const loadEvent = async () => {
            if (id) {
                const success = await fetchEventById(id);

                if (!success) {
                    dispatch(setEventsLoaded(false));
                    navigate(ROUTES.dashboard);

                }
            }
        };

        loadEvent();
    }, []);

    const isUserLoaded = !!user;
    const isEventLoaded = !!event && !!event.creator;

    if (loading || !isUserLoaded || !isEventLoaded) {
        return (
            <EventSharedInfoLoader />
        );
    }

    const isCreator = user.id === event.creator.id;

    return (
        <>
            <BackToDashboard />
            <div className="max-w-3xl mx-auto p-[var(--spacing-lg)] bg-[var(--background-secondary-color)] rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <p className="text-[var(--text-primary-color)] mb-6">{event.description}</p>

                {isCreator ? (
                    <CreatorLayout event={event} fetchEvent={fetchEventById} />
                ) : (
                    <ViewerLayout event={event} />
                )}
            </div>
        </>
    );
};
