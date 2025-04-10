import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUser } from "../services/adminService"
import { User } from "../types/user";

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
        setUsers(response.data);
        setPagination({
          next_page_url: response.next_page_url,
          prev_page_url: response.prev_page_url,
        });
      } else {
        setError("No se encontraron usuarios.");
      }
    } catch (error) {
      setError("Error al obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      try {
        await deleteUser(id);
        alert("Usuario eliminado con éxito.");
      } catch (error) {
        setUsers((prevUsers) => [...prevUsers]); // Revertir la eliminación
        alert("Hubo un error al eliminar el usuario.");
      }
    }
  };

  const handleSaveChanges = async (id: string, updatedUser: { name: string; role: string; user_type: string }) => {
    setUpdating(true);
    try {
      await updateUser(id, updatedUser);
      fetchUsers(); // Volver a obtener los usuarios después de la actualización
    } catch (error) {
      alert("Error al guardar los cambios.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateUser = async () => {
    console.log("")
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    handleCreateUser,
    nextPageUrl: pagination.next_page_url,
    prevPageUrl: pagination.prev_page_url,
    fetchUsersByUrl: fetchUsers,
  };
};
