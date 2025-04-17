import React, { useState } from "react";
import { UserModal } from "./components/UserModal";
import { useUsers } from "../../../hooks/useUsers";
import { User } from "../../../types/user";
import { PaginationButtons } from "./components/PaginationButtons";
import { UserFilter } from "./components/UserFilter";
import { UserTable } from "./components/UserTable";

export const UsersPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const {
    users,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    nextPageUrl,
    prevPageUrl,
    fetchUsersByUrl,
  } = useUsers(filter);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEdit = (id: string) => {
    const userToEdit = users.find((user) => user.id === id) || null;
    setSelectedUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserFilter filter={filter} onFilterChange={handleFilterChange} />
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {(loading ||  updating) && <p>Cargando usuarios...</p>}
      {error && <p>{error}</p>}

      <PaginationButtons
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        onPageChange={fetchUsersByUrl}
      />

      {isModalOpen && selectedUser && (
        <UserModal
          isOpen={isModalOpen}
          user={selectedUser}
          onClose={handleCloseModal}
          onEdit={handleSaveChanges}
        />
      )}
    </>
  );
};
