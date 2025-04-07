export interface User {
    id: string;
    name: string;
    email: string;
    profile_image: string;
    user_type: "free" | "premium";
    role: "admin" | "moderator" | "user";
}

export interface AuthUserResponse {
    message: string;
    user: User;
  }
  
