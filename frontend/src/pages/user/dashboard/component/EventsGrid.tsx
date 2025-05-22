import { CreateEventCard } from "./CreateEventCard";
import { EventCard } from "./EventCard";
import { DashboardEventsLoader } from "../../../../shared/loader/DashboardEventsLoader";
import { EventsGridProps } from "../../../../types/event";

export const EventsGrid: React.FC<EventsGridProps> = ({ events, loading, error, userId, onEventClick }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <CreateEventCard />

      {loading ? (
        <DashboardEventsLoader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            userId={userId}
            onClick={onEventClick}
          />
        ))
      )}
    </div>
  );
};
