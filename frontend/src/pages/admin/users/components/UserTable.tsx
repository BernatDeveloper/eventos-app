// components/UserTable.tsx
import React from "react";
import { UserTableProps } from "../../../../types/user";

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
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
            <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {user.name}
            </td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(user.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};