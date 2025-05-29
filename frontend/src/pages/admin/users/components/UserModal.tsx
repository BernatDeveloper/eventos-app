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
    <div className="custom-modal">
      <div className="bg-[var(--background-secondary-color)] p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit User</h2>
          <CloseModal onClose={onClose} />
        </div>
        <div className="mb-4">
          <label className="custom-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="custom-input"
          />
        </div>

        <div className="mb-4">
          <label className="custom-label">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="custom-input cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="custom-label">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="custom-input"
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="custom-label">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="custom-input"
          >
            <option value="premium">Premium</option>
            <option value="free">Free</option>
          </select>
        </div>
        <button
          onClick={handleSubmitEdit}
          className="w-full custom-button primary-button"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
