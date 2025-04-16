import React, { useState } from "react";
import { useEvents } from "../../../hooks/useEvents";
import { Event } from "../../../types/event";

export const EventPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const { events, loading, error, nextPageUrl, prevPageUrl, fetchEventsByUrl } = useEvents(filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

//   const handleDeleteEvent = async (id: string) => {
//     await handleDelete(id);
//     fetchEventsByUrl(); // Refresca la lista después de eliminar
//   };

//   const handleUpdateEvent = async (id: string, updatedEvent: { name: string; description: string; date: string }) => {AC
//     await handleSaveChanges(id, updatedEvent);
//   };

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filtrar eventos..."
          className="filter-input"
        />
      </div>

      {loading && <p>Cargando eventos...</p>}
      {error && <p>{error}</p>}

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-left px-4 py-2">Title</th>
          <th className="text-left px-4 py-2">Date</th>
          <th className="text-left px-4 py-2">Location</th>
          <th className="text-left px-4 py-2">Description</th>
          <th className="text-left px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-t">
            <td className="px-4 py-2">{event.title}</td>
            <td className="px-4 py-2">{event.start_date}</td>
            <td className="px-4 py-2">{event.location_id}</td>
            <td className="px-4 py-2">{event.description}</td>
            <td className="px-4 py-2 space-x-2">
              {/* <button
                onClick={() => onEdit(event.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      <div className="pagination">
        {prevPageUrl && (
          <button onClick={() => fetchEventsByUrl(prevPageUrl)}>Anterior</button>
        )}
        {nextPageUrl && (
          <button onClick={() => fetchEventsByUrl(nextPageUrl)}>Siguiente</button>
        )}
      </div>
    </div>
  );
};