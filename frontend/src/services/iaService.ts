import { AiDescriptionResponse } from "../types/ai";
import api from "./api";

export const generateAiDescription = async (title: string): Promise<AiDescriptionResponse> => {
    try {
        console.log(title)
        const response = await api.post("/generate-description", { title });

        return response.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error.response.data.message);
    }
};
