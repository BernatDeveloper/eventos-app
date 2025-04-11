import React from "react";
import { UserFilterProps } from "../../../../types/user";

export const UserFilter: React.FC<UserFilterProps> = ({ filter, onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    onFilterChange(newFilter);
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className="px-4 py-2 border border-gray-300 rounded-l-md"
        placeholder="Filtrar por nombre"
      />
    </div>
  );
};