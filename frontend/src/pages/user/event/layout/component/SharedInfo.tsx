import { Event } from "../../../../../types/event";
import { formatDate } from "../../../../../utils/formatData";
import { LocationMap } from "../../../../admin/location/components/LocationMap";
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineMapPin, HiOutlineUsers } from "react-icons/hi2";
import { FiMap } from "react-icons/fi";

export const SharedInfo = ({ event }: { event: Event }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fechas */}
      <div className="bg-[var(--background-color)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-3 text-[var(--primary-color)] font-semibold text-sm uppercase">
          <HiOutlineCalendarDays className="text-xl" />
          Fechas del evento
        </div>
        <p className="text-[var(--text-secondary-color)]">
          <span className="font-medium text-[var(--text-primary-color)]">Inicio:</span> {formatDate(event.start_date)} - {event.start_time}
        </p>
        <p className="text-[var(--text-secondary-color)] mt-1">
          <span className="font-medium text-[var(--text-primary-color)]">Fin:</span> {formatDate(event.end_date)} - {event.end_time}
        </p>
      </div>

      {/* Creador */}
      {event.creator && (
        <div className="bg-[var(--background-color)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-3 text-[var(--primary-color)] font-semibold text-sm uppercase">
            <HiOutlineUser className="text-xl" />
            Creador
          </div>
          <p className="text-[var(--text-primary-color)] font-medium">{event.creator.name}</p>
          <p className="text-[var(--text-muted-color)] text-sm">{event.creator.email}</p>
        </div>
      )}

      {/* Categoría */}
      {event.category && (
        <div className="bg-[var(--background-color)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-3 text-[var(--primary-color)] font-semibold text-sm uppercase">
            <HiOutlineUsers className="text-xl" />
            Categoría
          </div>
          <p className="text-[var(--text-primary-color)] font-medium">{event.category.name}</p>
          <p className="text-[var(--text-muted-color)] text-sm">{event.category.description}</p>
        </div>
      )}

      {/* Participación */}
      <div className="bg-[var(--background-color)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-3 text-[var(--primary-color)] font-semibold text-sm uppercase">
          <HiOutlineUsers className="text-xl" />
          Participación
        </div>
        <p className="text-[var(--text-secondary-color)]">Límite: {event.participant_limit}</p>
        <p className="text-[var(--text-secondary-color)]">Registrados: {event.participants?.length ?? 0}</p>
      </div>

      {/* Ubicación */}
      {event.location && (
        <div className="md:col-span-2 bg-[var(--background-color)] p-6 rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-medium)] border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-3 text-[var(--primary-color)] font-semibold text-sm uppercase">
            <HiOutlineMapPin className="text-xl" />
            Ubicación
          </div>
          <p className="text-[var(--text-secondary-color)]">
            {event.location.name}, {event.location.address}
          </p>
          <div className="mt-4 h-64 rounded-lg overflow-hidden">
            <LocationMap
              latitude={Number(event.location.latitude)}
              longitude={Number(event.location.longitude)}
              interactive={false}
            />
          </div>
          <a
            href={`https://www.google.com/maps?q=${event.location.latitude},${event.location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button mt-[var(--spacing-md)]"
          >
            <FiMap />
            Ver en Google Maps
          </a>
        </div>
      )}
    </div>
  );
};
