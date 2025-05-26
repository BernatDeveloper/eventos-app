import { useState } from "react";
import { generateAiDescription } from "../services/iaService";
import toast from "react-hot-toast";

export const useAi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateEventAiDescription = async (title: string): Promise<string | null> => {
        try {
            setLoading(true);
            const response = await generateAiDescription(title);
            console.log(response)
            const descripcion = response.description;

            toast.success(response.message);
            return descripcion;
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        generateEventAiDescription,
        loading,
        error,
    };
};
