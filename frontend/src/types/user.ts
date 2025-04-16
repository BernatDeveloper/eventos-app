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

export interface PaginatedUsersResponse {
    message: string;
    data: {
        current_page: number;
        data: User[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}


export interface PaginationButtonsProps {
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    onPageChange: (url: string) => void;
}

export interface UserFilterProps {
    filter: string,
    onFilterChange: (filter: string) => void;
}

export interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}