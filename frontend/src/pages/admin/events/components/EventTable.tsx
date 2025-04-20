import React from "react";
import { EventTableProps } from "../../../../types/event";
import { LocationModal } from "../../location/LocationModal";
import { UpdateLoction } from "../../../../types/location";

export const EventTable: React.FC<EventTableProps> = ({ events, onEdit, onDelete, refreshEvents }) => {
  const [selectedLocation, setSelectedLocation] = React.useState<UpdateLoction | null>(null);

  const handleLocationClick = (location: UpdateLoction) => {
    setSelectedLocation(location); // Establece la ubicación seleccionada
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden table-fixed">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2 w-48 truncate">Title</th>
            <th className="text-left px-4 py-2 w-52 truncate">Date</th>
            <th className="text-left px-4 py-2 w-40 truncate">Location</th>
            <th className="text-left px-4 py-2 w-60 truncate">Description</th>
            <th className="text-left px-4 py-2 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t">
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {event.title}
              </td>
              <td className="px-4 py-2 truncate">
                {new Date(`${event.start_date}`).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                - {event.start_time}
              </td>
              <td
                className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer text-blue-500"
                onClick={() => event.location && handleLocationClick({ id: event.location_id, name: event.location.name, latitude: event.location.latitude, longitude: event.location.longitude })}
              >
                {event.location ? event.location.name : "null"}
              </td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {event.description}
              </td>

              <td className="px-4 py-2 space-x-2 truncate">
                <button
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal: Pasa la ubicación seleccionada */}
      {selectedLocation && (
        <LocationModal
          isOpen={Boolean(selectedLocation)}
          onClose={() => setSelectedLocation(null)}
          location={selectedLocation}
          refreshEvents={refreshEvents}
        />
      )}
    </div>
  );
};
