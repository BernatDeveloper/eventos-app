import React from "react";
import { EventFilterProps } from "../../../../types/event";

export const EventFilter: React.FC<EventFilterProps> = ({ filter, onFilterChange }) => {
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
        className="custom-input"
        placeholder="Filtrar por nombre"
      />
    </div>
  );
};