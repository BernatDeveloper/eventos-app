import api from "./api";

interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        profile_image: string;
        user_type: "free" | "premium";
    };
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en la autenticación";
    }
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/auth/register", userData);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en el registro";
    }
};

export const logout = async (): Promise<void> => {
    try {
        await api.post("/auth/logout");
        localStorage.removeItem("token");
    } catch (error: any) {
        console.error("Error en logout:", error.response?.data || error);
    }
};


export const getUser = async (): Promise<LoginResponse["user"]> => {
    try {
        const response = await api.get<LoginResponse["user"]>("/auth/user");
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error al obtener los datos del usuario";
    }
};
