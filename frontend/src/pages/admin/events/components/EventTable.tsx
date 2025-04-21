import React from "react";
import { EventTableProps } from "../../../../types/event";
import { LocationModal } from "../../location/LocationModal";
import { Location } from "../../../../types/location";

export const EventTable: React.FC<EventTableProps> = ({ events, onEdit, onDelete, refreshEvents }) => {
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);
  const [locationMode, setLocationMode] = React.useState<"create" | "edit">("create");
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);

  const handleLocationClick = (location: Location, isEdit: boolean) => {
    setLocationMode(isEdit ? "edit" : "create");
    setSelectedLocation(location);
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
                onClick={() => {
                  setSelectedEventId(event.id); // <- guardamos el ID del evento
                  if (event.location) {
                    handleLocationClick({
                      id: event.location_id,
                      name: event.location.name,
                      address: event.location.address,
                      latitude: event.location.latitude,
                      longitude: event.location.longitude,
                    }, true);
                  } else {
                    handleLocationClick({
                      id: 0,
                      name: '',
                      address: '',
                      latitude: 0,
                      longitude: 0,
                    }, false);
                  }
                }}
              >
                {event.location ? event.location.name : "No Location"}
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
                  onClick={() => onDelete(event.id, event?.location_id)}
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
          onClose={() => {
            setSelectedLocation(null);
            setSelectedEventId(null); // limpiamos el eventId también
          }}
          location={selectedLocation}
          eventId={selectedEventId}
          refreshEvents={refreshEvents}
          mode={locationMode}
        />
      )}

    </div>
  );
};
