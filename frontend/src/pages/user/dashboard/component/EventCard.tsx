import { FaCrown } from "react-icons/fa";
import { formatDate } from "../../../../utils/formatData";
import { getEventCategory } from "../../../../utils/categoriesDetails";
import { EventCardProps } from "../../../../types/event";
import { useTranslation } from "react-i18next";

export const EventCard: React.FC<EventCardProps> = ({ event, user, onClick }) => {
    const categoryName = user.user_type === "premium" ? event.category?.name || "Other" : "Other";
    const category = getEventCategory(categoryName);
    const Icon = category.icon;
    const isCreator = event.creator_id === user.id;
    const { t } = useTranslation('event')

    return (
        <div
            key={event.id}
            onClick={() => onClick(event.id)}
            aria-label={`Evento ${event.title}`}
            className={`custom-event-card bg-gradient-to-l ${category.color1} ${category.color2}`}
        >
            {isCreator && (
                <div
                    className="absolute top-3 right-3 bg-[var(--background-color)] rounded-full p-[var(--spacing-sm)] shadow-md shadow-[var(--box-shadow-light)]" title="Creator"
                >
                    <FaCrown className="text-yellow-400 text-xl" aria-label="Creador del evento" />
                </div>
            )}
            <div>
                <div className="flex items-center gap-2 mb-[var(--spacing-sm)]">
                    <h4 className="text-xl text-[var(--text-on-dark-primary)] font-bold leading-tight flex-grow line-clamp-1">{event.title}</h4>
                </div>

                <p className="relative z-10 mb-[var(--spacing-md)] line-clamp-2 flex-grow text-[var(--text-on-dark-primary)]">
                    {event.description}
                </p>
            </div>

            <div className="text-sm mb-[var(--spacing-xs)] text-[var(--text-on-dark-secondary)]">
                <p>{t('card.from')}: {formatDate(event.start_date)} - {event.start_time}</p>
                <p>{t('card.to')}: {formatDate(event.end_date)} - {event.end_time}</p>
            </div>

            <Icon
                aria-hidden="true"
                className={`absolute -bottom-7 -right-1 text-[10rem] opacity-30 pointer-events-none select-none rotate-12 ${category.colorIcon}`}
            />
        </div>
    );
};
