import api from "../api";
import { PaginatedEventsResponse } from "../../types/event";

export const getAllEvents = async (
    url: string = "/events",
    filters: string = ""
): Promise<PaginatedEventsResponse | null> => {
    try {
        const params = { title: filters };

        const response = await api.get<PaginatedEventsResponse>(url, {
            params,
        });

        if (!response.data) {
            console.warn("⚠️ La respuesta no contiene datos.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al obtener los eventos:", error.response?.data || error);
        return null;
    }
};
