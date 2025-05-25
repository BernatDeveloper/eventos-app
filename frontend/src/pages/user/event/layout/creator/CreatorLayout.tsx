import { EditEventSectionsProps } from "../../../../../types/event";
import { DeleteEventButton } from "./component/DeleteEventButton";
import { EditCategorySection } from "./component/EditCategorySection";
import { EditEventSection } from "./component/EditEventSection";
import { EditLocationSection } from "./component/EditLocationSection";
import { InviteUsersSection } from "./component/InviteUserSection";
import { ShowParticipantsSection } from "./component/ShowParticipantsSection";

export const CreatorLayout = ({ event, fetchEvent }: EditEventSectionsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-gray-500 italic">Eres el creador de este evento</p>
        <DeleteEventButton
          eventId={event.id}
          locationId={event.location_id}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl">
          <EditEventSection event={event} />
        </div>

        <div className="bg-white rounded-2xl">
          <EditLocationSection event={event} fetchEvent={fetchEvent} />
        </div>

        <div className="bg-white rounded-2xl">
          <InviteUsersSection eventId={event.id} />
        </div>

        <div className="bg-white rounded-2xl">
          <ShowParticipantsSection
            eventId={event.id}
            participants={event.participants.length}
            limit={event.participant_limit}
          />
        </div>

        <div className="bg-white rounded-2xl md:col-span-2">
          <EditCategorySection
            eventId={event.id}
            currentCategoryId={event.category_id}
          />
        </div>
      </div>
    </div>
  );
};
