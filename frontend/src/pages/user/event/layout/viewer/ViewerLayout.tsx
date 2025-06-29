import { useNavigate } from "react-router-dom";
import { SharedInfo } from "../component/SharedInfo";
import { EventSharedInfoLoader } from "../../../../../shared/loader/EventSharedInfoLoader";
import { ROUTES } from "../../../../../routes/routes";
import { Event } from "../../../../../types/event";
import { HiOutlineUsers } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

export const ViewerLayout = ({ event }: { event: Event | null }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('event')

    if (!event) {
        return <EventSharedInfoLoader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-[var(--text-muted-color)]">
                    {t('viewer.phrase')}
                </p>
                <button
                    onClick={() => navigate(ROUTES.participant.replace(':eventId', event.id))}
                    className="custom-button primary-button"
                    title="Ver participantes"
                >
                    {t('viewer.button.participants')}
                    <HiOutlineUsers className="text-xl" />
                </button>
            </div>

            <SharedInfo event={event} />
        </div>
    );
};
