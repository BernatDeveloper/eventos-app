import api from "./api";
import { User } from "../types/user";
import { LoginResponse, RegisterData } from "../types/auth";

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
        removeToken();
    }
};
