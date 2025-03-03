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
        const response = await api.post<LoginResponse>("/auth/login", { email, password });
        setToken(response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en la autenticación";
    }
};

// Registrar usuario
export const register = async (userData: RegisterData): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/auth/register", userData);
        setToken(response.data.token);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Error en el registro";
    }
};

// Cerrar sesión
export const logout = async (): Promise<void> => {
    try {
        await api.post("/auth/logout");
    } catch (error: any) {
        console.error("Error en logout:", error.response?.data || error);
    } finally {
        removeToken(); // Borra el token aunque falle el logout
    }
};

// Obtener usuario autenticado
export const getUser = async (): Promise<User> => {
    try {
        const response = await api.get<{ user: User }>("/auth/user");
        return response.data.user;
    } catch (error: any) {
        throw error.response?.data || "Error al obtener los datos del usuario";
    }
};
