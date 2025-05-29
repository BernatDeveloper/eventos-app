import api from "../api";

export interface StatsResponse {
    message: string;
    stats: Stats
}

export interface Stats {
    users: number;
    events: number;
    invitations: number;
    categories: number;
}

export const fetchStats = async (): Promise<StatsResponse> => {
    try {
        const response = await api.get<StatsResponse>('/stats');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};