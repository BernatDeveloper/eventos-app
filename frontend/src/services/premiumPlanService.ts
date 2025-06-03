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
        console.log(response)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch premium plan status.");
    }
};

export const activePremiumPlan = async (): Promise<Message> => {
    try {
        const response = await api.post("/premium/plan");
        console.log("Response ", response)

        return response.data;
    } catch (error: any) {
        console.log("Response ", error)

        throw new Error(error.response.data.message);
    }
};
