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
    location: Location;
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