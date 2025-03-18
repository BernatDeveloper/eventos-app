import { User } from "./user";

export interface LoginResponse {
    token: string;
    userId: number,
    user: User;
}

export interface RegisterData {
    userId: number,
    name: string;
    email: string;
    password: string;
}