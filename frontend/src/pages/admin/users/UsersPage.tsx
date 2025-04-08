import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../services/adminService";
import { UserModal } from "./UserModal";
import { User } from "../../../types/user";

export const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Usuario seleccionado para editar o eliminar
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal

    // Obtener los usuarios al cargar el componente
    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getAllUsers();
            if (fetchedUsers) {
                setUsers(fetchedUsers);
            } else {
                setError("No se encontraron usuarios.");
            }
        } catch (error) {
            setError("Error al obtener los usuarios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (id: string) => {
        const userToEdit = users.find((user) => user.id === id) || null;
        setSelectedUser(userToEdit);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            // Eliminación inmediata desde el estado local
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

            try {
                await deleteUser(id);
                alert("Usuario eliminado con éxito.");
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                alert("Hubo un error al eliminar el usuario.");
                fetchUsers();
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveChanges = (id: string, updatedUser: { name: string; email: string; role: string }) => {
        console.log("Saving changes for user", id, updatedUser);
        // Llama a la API para guardar los cambios del usuario
    };

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <table className="w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left px-4 py-2">Name</th>
                        <th className="text-left px-4 py-2">Email</th>
                        <th className="text-left px-4 py-2">Role</th>
                        <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <UserModal
                isOpen={isModalOpen}
                user={selectedUser}
                onClose={handleCloseModal}
                onEdit={handleSaveChanges}
                onDelete={handleDelete}
            />
        </div>
    );
};
