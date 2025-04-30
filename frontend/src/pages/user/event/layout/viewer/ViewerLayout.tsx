import { SharedInfo } from "../../EventPage";

export const ViewerLayout = ({ event }: { event: any }) => (
    <>
        <p className="text-gray-600 italic mb-4">Estás viendo este evento como invitado.</p>
        <SharedInfo event={event} />
    </>
);