
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
    <div className="overflow-x-auto w-full rounded-[var(--border-radius-medium)]">
      <table className="w-full text-left bg-[var(--background-secondary-color)]">
        <thead className="bg-[var(--background-tertiary-color)] text-[var(--text-primary-color)]">
          <tr>
            <th className="text-left px-4 py-2">Title</th>
            <th className="text-left px-4 py-2">Date</th>
            <th className="text-left px-4 py-2">Location</th>
            <th className="text-left px-4 py-2">Category</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="text-[var(--text-primary-color)] border-t border-[var(--text-on-dark-secondary)]">
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {event.title}
              </td>
              <td className="px-4 py-2">
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
                  setSelectedEventId(event.id);
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
                className="px-4 py-2 max-w-[10px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer text-[var(--link-color)] underline"
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
