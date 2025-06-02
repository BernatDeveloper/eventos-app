import api from "./api";

export const setLocale = async (
    lang: string
): Promise<{ message: string }> => {
    try {
        const response = await api.get(`/locale/${lang}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};

export const getCurrentLocale = async (): Promise<string> => {
    try {
        const response = await api.get("/locale");
        return response.data.locale;
    } catch (error: any) {
        return "es";
    }
};
