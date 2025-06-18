import { useState } from "react";
import toast from "react-hot-toast";
import {
  searchUsersByName,
  updateUsername,
  updateProfileImage,
} from "../services/userService";
import { useAuth } from "./useAuth";
import { User } from "../types/user";

export const useUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    } catch (error: any) {
      setError(error.message);
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
      toast.error(error.message);
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
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return {
    loading,
    updating,
    error,
    searchUsers,
    handleUpdateUsername,
    handleUpdateProfileImage
  };
};
