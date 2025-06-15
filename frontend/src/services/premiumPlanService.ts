import { Message } from "../types/message";
import api from "./api";

interface PremiumPlanStatus {
    is_premium: boolean;
    expired_at: string | null;
    can_retry: boolean;
    retry_available_at: string | null;
}

export const getPremiumPlanStatus = async (): Promise<PremiumPlanStatus> => {
    try {
        const response = await api.get("/premium/plan");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch premium plan status.");
    }
};

export const activePremiumPlan = async (): Promise<Message> => {
    try {
        const response = await api.post("/premium/plan");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};
