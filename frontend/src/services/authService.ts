import api from "./api";
import { LoginResponse, RegisterData } from "../types/auth";

export const createToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const deleteToken = () => {
    localStorage.removeItem('token');
};


export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("/login", { email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Registrar usuario
export const register = async (userData: RegisterData): Promise<LoginResponse> => {
    console.log(userData)
    try {
        const response = await api.post<LoginResponse>("/register", userData);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

// Cerrar sesión
export const logout = async (): Promise<void> => {
    try {
        await api.post("/logout");
    } catch (error: any) {
        throw new Error(error.message);
    }
};
