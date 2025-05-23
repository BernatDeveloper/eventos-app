import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../services/admin/adminUserService"
import { User } from "../types/user";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export const useAdminUsers = (filter: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<{
    current_page: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
  }>({
    current_page: null,
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
          current_page: response.data.current_page,
          next_page_url: response.data.next_page_url,
          prev_page_url: response.data.prev_page_url,
        });
      } else {
        setError("No users found.");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("swal.delete_title"),
      text: t("swal.delete_user"),
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#bbb',
      confirmButtonText: t('button.confirm_delete'),
      cancelButtonText: t('button.cancel'),
    });

    if (result.isConfirmed) {
      try {
        const deleted = await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success(deleted.message);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };


  const handleSaveChanges = async (id: string, updatedUser: { name: string; role: string; user_type: string }) => {
    setUpdating(true);
    try {
      const response = await updateUser(id, updatedUser);
      fetchUsers();
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message)
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
    currentPage: pagination.current_page,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchUsersByUrl: fetchUsers,
  };
};
