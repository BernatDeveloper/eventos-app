export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryResponse {
  message: string;
  category: Category;
}

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}

export interface CategorySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}