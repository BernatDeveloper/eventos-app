import { FaCrown } from "react-icons/fa";
import { formatDate } from "../../../../utils/formatData";
import { getEventCategory } from "../../../../utils/categoriesDetails";
import { EventCardProps } from "../../../../types/event";

export const EventCard: React.FC<EventCardProps> = ({ event, userId, onClick }) => {
    const categoryName = event.category?.name || "Other";
    const category = getEventCategory(categoryName);
    const Icon = category.icon;
    const isCreator = event.creator_id === userId;

    return (
        <div
            key={event.id}
            className={`relative cursor-pointer rounded-xl overflow-hidden p-6 shadow-md transition flex flex-col bg-gradient-to-l ${category.color1} ${category.color2} hover:opacity-90 w-[360px] h-[200px]`}
            onClick={() => onClick(event.id)}
            aria-label={`Evento ${event.title}`}
        >
            <div className="flex items-center gap-2 mb-2">
                {isCreator && (
                    <div
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
                        title="Creator"
                    >
                        <FaCrown className="text-yellow-400 text-xl" />
                    </div>
                )}
                <h4 className="text-xl font-bold text-white">{event.title}</h4>
            </div>

            <p className="text-white/90 mb-5 flex-grow line-clamp-3">{event.description}</p>

            <div className="text-white text-sm mb-3">
                <p>Desde: {formatDate(event.start_date)} - {event.start_time}</p>
                <p>Hasta: {formatDate(event.end_date)} - {event.end_time}</p>
            </div>

            <Icon
                className={`absolute top-18 left-50 text-[10rem] ${category.colorIcon} rotate-12 pointer-events-none select-none opacity-30`}
                aria-hidden="true"
            />
        </div>
    );
};
