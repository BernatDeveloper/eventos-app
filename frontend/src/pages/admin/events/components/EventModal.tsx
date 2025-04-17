import React, { useState, useEffect } from "react";
import { EventModalProps } from "../../../../types/event";

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

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
            // Formatear fechas correctamente para los inputs
            setStartDate(event.start_date?.slice(0, 10) || "");
            setEndDate(event.end_date?.slice(0, 10) || "");
            setStartTime(event.start_time);
            setEndTime(event.end_time);
            setParticipantLimit(event.participant_limit || "");
        }
    }, [event]);

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>

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

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmitEdit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
