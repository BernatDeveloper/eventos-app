import { useState } from "react";
import { updateUser } from "../services/admin/adminUserService";
import { searchUsersByName } from "../services/userService";
import { User } from "../types/user";
import toast from "react-hot-toast";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async (id: string, updatedUser: { name: string; role: string; user_type: string }) => {
    setUpdating(true);
    try {
      await updateUser(id, updatedUser);
      toast.success("User updated");
    } catch (error) {
      toast.error("Error saving changes");
    } finally {
      setUpdating(false);
    }
  };

  const searchUsers = async (nameFragment: string, eventId: string): Promise<User[]> => {
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
  

  return {
    users,
    loading,
    updating,
    error,
    handleSaveChanges,
    searchUsers, // <- función para llamar desde tu componente
  };
};
