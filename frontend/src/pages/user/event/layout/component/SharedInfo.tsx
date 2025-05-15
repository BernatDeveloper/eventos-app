import { Event } from "../../../../../types/event";
import { formatDate } from "../../../../../utils/formatData";
import { LocationMap } from "../../../../admin/location/components/LocationMap";
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineMapPin, HiOutlineUsers } from "react-icons/hi2";
import { FiMap } from "react-icons/fi";

export const SharedInfo = ({ event }: { event: Event }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fechas */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-sm uppercase">
          <HiOutlineCalendarDays className="text-xl" />
          Fechas del evento
        </div>
        <p className="text-gray-700">
          <span className="font-medium text-gray-800">Inicio:</span> {formatDate(event.start_date)} - {event.start_time}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-medium text-gray-800">Fin:</span> {formatDate(event.end_date)} - {event.end_time}
        </p>
      </div>

      {/* Creador */}
      {event.creator && (
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-sm uppercase">
            <HiOutlineUser className="text-xl" />
            Creador
          </div>
          <p className="text-gray-800 font-medium">{event.creator.name}</p>
          <p className="text-gray-500 text-sm">{event.creator.email}</p>
        </div>
      )}

      {/* Categoría */}
      {event.category && (
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-sm uppercase">
            <HiOutlineUsers className="text-xl" />
            Categoría
          </div>
          <p className="text-gray-800 font-medium">{event.category.name}</p>
          <p className="text-gray-500 text-sm">{event.category.description}</p>
        </div>
      )}

      {/* Participación */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-sm uppercase">
          <HiOutlineUsers className="text-xl" />
          Participación
        </div>
        <p className="text-gray-700">Límite: {event.participant_limit}</p>
        <p className="text-gray-700">Registrados: {event.participants?.length ?? 0} / {event.participant_limit}</p>
      </div>

      {/* Ubicación */}
      {event.location && (
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow border border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-blue-600 font-semibold text-sm uppercase">
            <HiOutlineMapPin className="text-xl" />
            Ubicación
          </div>
          <p className="text-gray-700">{event.location.name}, {event.location.address}</p>
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
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            <FiMap />
            Ver en Google Maps
          </a>
        </div>
      )}
    </div>
  );
};
