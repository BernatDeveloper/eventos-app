import api from "./api";

interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string;
    user_type: "free" | "premium";
    role: "admin" | "moderator" | "user";
}

interface LoginResponse {
    token: string;
    user: User;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

// Funciones para manipular el token en localStorage
export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// Iniciar sesión
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/login", { email, password });
        setToken(response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en la autenticación";
    }
};

// Registrar usuario
export const register = async (userData: RegisterData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/register", userData);
        setToken(response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en el registro";
    }
};

// Cerrar sesión
export const logout = async (): Promise<void> => {
    try {
        await api.post("/logout");
    } catch (error: any) {
        console.error("Error en logout:", error.response?.data || error);
    } finally {
        removeToken(); // Borra el token aunque falle el logout
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const response = await api.get<User>("/user");
        
        if (!response.data) {
            console.warn("⚠️ La respuesta no contiene datos.");
            return null;
        }

        return response.data;
    } catch (error: any) {
        console.error("❌ Error al obtener el usuario:", error.response?.data || error);
        return null;
    }
};


