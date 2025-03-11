import { User } from "./user";

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}