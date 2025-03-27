import { User } from "./user";

export interface LoginResponse {
    token: string;
    userId: number,
    user: User;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}