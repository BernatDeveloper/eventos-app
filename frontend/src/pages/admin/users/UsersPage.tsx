import React, { useState } from "react";
import { UserModal } from "./components/UserModal";
import { useAdminUsers } from "../../../hooks/useAdminUsers";
import { User } from "../../../types/user";
import { PaginationButtons } from "./components/PaginationButtons";
import { UserFilter } from "./components/UserFilter";
import { UserTable } from "./components/UserTable";
import { Loader } from "../../../shared/loader/Loader";

export const UsersPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const {
    users,
    loading,
    updating,
    error,
    handleDelete,
    handleSaveChanges,
    currentPage,
    nextPageUrl,
    prevPageUrl,
    fetchUsersByUrl,
  } = useAdminUsers(filter);
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

      {(loading || updating) && <Loader />}
      {error && <p>{error}</p>}

      <PaginationButtons
        currentPage={currentPage}
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
