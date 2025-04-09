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

export interface UserModalProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onEdit: (id: string, updatedUser: { name: string; role: string; user_type: string }) => void;
}