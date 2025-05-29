
import { EventTableProps } from "../../../../types/event";
import { LocationModal } from "../../location/LocationModal";
import { Location } from "../../../../types/location";
import { useState } from "react";
import { CategoryEditModal } from "../../../../shared/modals/CategoryEditModal";

export const EventTable: React.FC<EventTableProps> = ({ events, onEdit, onDelete, refreshEvents }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationMode, setLocationMode] = useState<"create" | "edit">("create");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleLocationClick = (location: Location, isEdit: boolean) => {
    setLocationMode(isEdit ? "edit" : "create");
    setSelectedLocation(location);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[var(--background-secondary-color)] shadow rounded-lg overflow-hidden table-fixed">
        <thead className="bg-[var(--background-tertiary-color)] text-[var(--text-primary-color)]">
          <tr>
            <th className="text-left px-4 py-2 w-48 truncate">Title</th>
            <th className="text-left px-4 py-2 w-52 truncate">Date</th>
            <th className="text-left px-4 py-2 w-40 truncate">Location</th>
            <th className="text-left px-4 py-2 w-60 truncate">Category</th>
            <th className="text-left px-4 py-2 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="text-[var(--text-primary-color)] border-t border-[var(--text-on-dark-secondary)]">
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
                className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer text-[var(--link-color)] underline"
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
              <td
                className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer text-[var(--link-color)] underline"
                onClick={() => {
                  setSelectedEventId(event.id);
                  setSelectedCategoryId(event.category_id ?? null);
                  setCategoryModalOpen(true);
                }}
              >
                {event.category_id ? event.category?.name : 'No Category'}
              </td>
              <td className="px-4 py-2 space-x-2 truncate">
                <button
                  onClick={() => onEdit(event.id)}
                  className="custom-button primary-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event.id, event?.location_id)}
                  className="custom-button reject-button"
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
            setSelectedEventId(null);
          }}
          location={selectedLocation}
          eventId={selectedEventId}
          refreshEvents={refreshEvents}
          mode={locationMode}
        />
      )}

      {/* Modal: Editar / crear categoria para el evento*/}
      {categoryModalOpen && selectedEventId && (
        <CategoryEditModal
          isOpen={categoryModalOpen}
          onClose={() => {
            setCategoryModalOpen(false);
            setSelectedEventId(null);
          }}
          eventId={selectedEventId}
          initialCategoryId={selectedCategoryId}
          refreshEvents={refreshEvents}
        />
      )}

    </div>
  );
};
