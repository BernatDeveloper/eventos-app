import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../services/admin/adminUserService"
import { User } from "../types/user";
import toast from "react-hot-toast";

export const useUsers = (filter: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    next_page_url: string | null;
    prev_page_url: string | null;
  }>({
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    fetchUsers(); // Cargar los usuarios al inicio y al filtrar
  }, [filter]); // Volver a ejecutar cuando el filtro cambie

  const fetchUsers = async (url: string = "/users") => {
    try {
      const response = await getAllUsers(url, filter);
      if (response) {
        setUsers(response.data.data);
        setPagination({
          next_page_url: response.data.next_page_url,
          prev_page_url: response.data.prev_page_url,
        });
      } else {
        setError("No users found.");
      }
    } catch (error) {
      setError("Error getting users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const deleted = await deleteUser(id);

        if (!deleted) {
          toast.error("Failed to delete user.");
          return;
        }

        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }
  };

  const handleSaveChanges = async (id: string, updatedUser: { name: string; role: string; user_type: string }) => {
    setUpdating(true);
    try {
      await updateUser(id, updatedUser);
      fetchUsers();
      toast.success("User updated")
    } catch (error) {
      toast.error("Error saving changes")
    } finally {
      setUpdating(false);
    }
  };

  return {
    users,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchUsersByUrl: fetchUsers,
  };
};
