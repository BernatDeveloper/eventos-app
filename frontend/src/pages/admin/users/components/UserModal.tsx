import React, { useState, useEffect } from "react";
import { UserModalProps } from "../../../../types/user";
import { CloseModal } from "../../../../shared/modals/CloseModal";

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  user,
  onClose,
  onEdit,
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [userType, setUserType] = useState(user?.user_type || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setUserType(user.user_type);
    }
  }, [user]);

  const handleSubmitEdit = () => {
    if (user) {
      onEdit(user.id, {
        name,
        role,
        user_type: userType,
      });
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit User</h2>
          <CloseModal onClose={onClose} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="premium">Premium</option>
            <option value="free">Free</option>
          </select>
        </div>
        <button
          onClick={handleSubmitEdit}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
