import api from "../api";
import { PaginatedEventsResponse } from "../../types/event";

export const getAllEvents = async (
    url: string = "/events",
    filters: string = ""
): Promise<PaginatedEventsResponse> => {
    try {
        const params = { title: filters };

        const response = await api.get<PaginatedEventsResponse>(url, {
            params,
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
