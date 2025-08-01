import { Location } from "./location";
import { Category } from "./category";
import { User } from "./user";

export interface Event {
    id: string;
    creator_id: string;
    location_id: number;
    category_id: number;
    title: string;
    description: string;
    participant_limit: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    creator: User;
    location: Location | null;
    category: Category;
    participants: User[];
}

export interface PaginatedEventsResponse {
    message: string;
    data: {
        current_page: number;
        data: Event[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}

export interface MyEventsResponse {
    message: string;
    events: Event[];
}

export interface EventResponse {
    message: string;
    event: Event;
}

export interface EventTableProps {
    events: Event[];
    onEdit: (id: string) => void;
    onDelete: (eventId: string, locationId?: number) => void;
    refreshEvents: () => void;
}

export interface EventFilterProps {
    filter: string,
    onFilterChange: (filter: string) => void;
}

export interface EventModalProps {
    isOpen: boolean;
    event: Event | null;
    onClose: () => void;
    onEdit: (id: string, updatedEvent: {
        title: string;
        description: string;
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
        participant_limit?: number;
    }) => void;
}

export interface EditEventSectionsProps {
    event: Event;
    fetchEvent: (id: string) => Promise<Event | boolean>;
}

export interface EventsGridProps {
    events: Event[];
    loading: boolean;
    error: string | null;
    user: User;
    onEventClick: (eventId: string) => void;
}

export interface EventCardProps {
    event: Event;
    user: User;
    onClick: (eventId: string) => void;
}

export interface DeleteEventButtonProps {
    eventId: string;
    locationId?: number;
}

export interface EditEventSectionProps {
    event: Event;
    fetchEvent: (id: string) => Promise<Event | boolean>;
}

export type EditableEventFields = {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    participant_limit?: number;
};