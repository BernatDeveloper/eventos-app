import { EditEventSectionsProps } from "../../../../../types/event";
import { CreatorInfo } from "./component/CreatorInfo";
import { EditEventSection } from "./component/EditEventSection";
import { EditLocationSection } from "./component/EditLocationSection";
import { InviteUsersSection } from "./component/InviteUserSection";
import { ShowParticipantsSection } from "./component/ShowParticipantsSection";

export const CreatorLayout = ({ event, fetchEvent}: EditEventSectionsProps) => {
  return (
    <>
      <CreatorInfo />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EditEventSection event={event} />
        <EditLocationSection event={event} fetchEvent={fetchEvent} />
        <InviteUsersSection eventId={event.id} />
        <ShowParticipantsSection eventId={event.id} />
      </div>
    </>
  );
};
