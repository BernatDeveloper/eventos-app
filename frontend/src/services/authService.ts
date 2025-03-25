import api from "./api";
import { LoginResponse, RegisterData } from "../types/auth";

// Funciones para manipular el token en localStorage
export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// Funciones para manipular el userId en localStorage
export const setUserId = (userId: string) => localStorage.setItem("userId", String(userId));
export const getUserId = (): string | null => localStorage.getItem("userId");
export const removeUserId = () => localStorage.removeItem("userId");

// Iniciar sesión
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/login", { email, password });
        console.log(response.data)
        setToken(response.data.token);
        setUserId(response.data.user.id);
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
        setUserId(response.data.user.id);
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
        removeToken();
        removeUserId();
    }
};
