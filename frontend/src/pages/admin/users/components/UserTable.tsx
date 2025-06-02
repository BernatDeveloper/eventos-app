import React from "react";
import { UserTableProps } from "../../../../types/user";
import { ProfileImage } from "../../../../shared/image/ProfileImage";

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full rounded-[var(--border-radius-medium)]">
      <table className="w-full text-left bg-[var(--background-secondary-color)]">
        <thead className="bg-[var(--background-tertiary-color)] text-[var(--text-primary-color)]">
          <tr>
            <th className="px-4 py-2">Img</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="text-[var(--text-primary-color)] border-t border-[var(--text-on-dark-secondary)]"
            >
              <td className="px-4 py-2 min-w-[80px]">
                <ProfileImage profileImage={user.profile_image} size={50} />
              </td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.name}
              </td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.email}
              </td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2 space-x-2 truncate">
                <button onClick={() => onEdit(user.id)} className="custom-button primary-button">
                  Edit
                </button>
                <button onClick={() => onDelete(user.id)} className="custom-button reject-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
