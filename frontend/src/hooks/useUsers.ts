import { useState } from "react";
import toast from "react-hot-toast";
import {
  getAuthUser,
  searchUsersByName,
  updateUsername,
  updateProfileImage,
  updatePassword,
} from "../services/userService";
import { useAuth } from "./useAuth";
import { User } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const { user, setUser } = useAuth()

  const searchUsers = async (
    nameFragment: string,
    eventId: string
  ): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const foundUsers = await searchUsersByName(nameFragment, eventId);
      return foundUsers.users;
    } catch (err: any) {
      setError("Failed to fetch users");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async (name: string): Promise<void> => {
    setUpdating(true);
    try {
      const response = await updateUsername(name);
      if (user) {
        setUser({ ...user, name });
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Error updating username");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateProfileImage = async (formData: FormData): Promise<void> => {
    setUpdating(true);
    try {
      const response = await updateProfileImage(formData);
      if (user) {
        setUser({ ...user, profile_image: response.user.profile_image });
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar la imagen de perfil");
    } finally {
      setUpdating(false);
    }
  };

  return {
    users,
    loading,
    updating,
    error,
    searchUsers,
    handleUpdateUsername,
    handleUpdateProfileImage
  };
};
