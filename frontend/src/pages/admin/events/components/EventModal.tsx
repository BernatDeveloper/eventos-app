import React, { useState, useEffect } from "react";
import { EventModalProps } from "../../../../types/event";
import { CloseModal } from "../../../../shared/modals/CloseModal";
import { useUserEvents } from "../../../../hooks/useUserEvents";

export const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    event,
    onClose,
    onEdit,
}) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [start_date, setStartDate] = useState(event?.start_date || "");
    const [end_date, setEndDate] = useState(event?.end_date || "");
    const [start_time, setStartTime] = useState(event?.start_time || "");
    const [end_time, setEndTime] = useState(event?.end_time || "");
    const [participant_limit, setParticipantLimit] = useState(event?.participant_limit || "");
    const { fetchEventById } = useUserEvents()

    useEffect(() => {
        const fetchData = async () => {
            if (event) {
                const updatedEvent = await fetchEventById(event.id);

                if (updatedEvent) {
                    setTitle(updatedEvent.title);
                    setDescription(updatedEvent.description);
                    setStartDate(updatedEvent.start_date?.slice(0, 10) || "");
                    setEndDate(updatedEvent.end_date?.slice(0, 10) || "");
                    setStartTime(updatedEvent.start_time);
                    setEndTime(updatedEvent.end_time);
                    setParticipantLimit(updatedEvent.participant_limit || "");
                }
            }
        };

        fetchData();
    }, [event?.id, isOpen]);

    const handleSubmitEdit = () => {
        if (event) {
            onEdit(event.id, {
                title,
                description,
                start_date,
                end_date,
                start_time,
                end_time,
                participant_limit: participant_limit ? Number(participant_limit) : undefined,
            });
            onClose();
        }
    };

    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Edit Event</h2>
                    <CloseModal onClose={onClose} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Event Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Start Time</label>
                    <input
                        type="time"
                        value={start_time}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">End Time</label>
                    <input
                        type="time"
                        value={end_time}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Participant Limit</label>
                    <input
                        type="number"
                        value={participant_limit}
                        onChange={(e) => setParticipantLimit(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    onClick={handleSubmitEdit}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
