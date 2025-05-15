import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserEvents } from '../../../hooks/useUserEvents';
import { useAuth } from '../../../hooks/useAuth';
import { CreatorLayout } from './layout/creator/CreatorLayout';
import { ViewerLayout } from './layout/viewer/ViewerLayout';
import BackToDashboard from '../../../shared/redirect/BackToDashboard';
import { EventSharedInfoLoader } from '../../../shared/loader/EventSharedInfoLoader';

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const { event, fetchEventById, loading, error } = useUserEvents();
    const { user } = useAuth();

    useEffect(() => {
        if (id) {
            fetchEventById(id);
        }
    }, []);

    const isUserLoaded = !!user;
    const isEventLoaded = !!event && !!event.creator;

    if (loading || !isUserLoaded || !isEventLoaded) {
        return (
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <EventSharedInfoLoader />
            </div>
        );
    }

    if (error) {
        return (
            <p className="max-w-3xl mx-auto mt-10 p-6 text-center text-red-600 bg-red-100 rounded-lg shadow">
                {error}
            </p>
        );
    }

    const isCreator = user.id === event.creator.id;

    return (
        <>
            <BackToDashboard />
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-primary mb-4">{event.title}</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>

                {isCreator ? (
                    <CreatorLayout event={event} fetchEvent={fetchEventById} />
                ) : (
                    <ViewerLayout event={event} />
                )}
            </div>
        </>
    );
};
