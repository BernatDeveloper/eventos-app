import React, { useState, useEffect } from "react";
import { EventModalProps } from "../../../../types/event";
import { CloseModal } from "../../../../shared/modals/CloseModal";
import { useUserEvents } from "../../../../hooks/useUserEvents";
import { useTranslation } from "react-i18next";

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
    const { fetchEventById } = useUserEvents();
    const { t } = useTranslation('event');


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
        <div className="custom-modal">
            <div className="modal-content max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{t('creator.event.title')}</h2>
                    <CloseModal onClose={onClose} />
                </div>

                {[
                    { label: t('edit_event_modal.name'), value: title, setter: setTitle, type: "text", maxLength: 50 },
                    { label: t('edit_event_modal.desc'), value: description, setter: setDescription, type: "textarea" },
                    { label: t('edit_event_modal.participant_limit'), value: participant_limit, setter: setParticipantLimit, type: "number", min: 1, max: 20 },
                    { label: t('edit_event_modal.start_date'), value: start_date, setter: setStartDate, type: "date" },
                    { label: t('edit_event_modal.end_date'), value: end_date, setter: setEndDate, type: "date" },
                    { label: t('edit_event_modal.start_time'), value: start_time, setter: setStartTime, type: "time" },
                    { label: t('edit_event_modal.end_time'), value: end_time, setter: setEndTime, type: "time" },
                ].map(({ label, value, setter, type, ...rest }, i) => (
                    <div className="mb-4" key={i}>
                        <label className="custom-label">{label}</label>
                        {type === "textarea" ? (
                            <textarea
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                className="custom-input"
                            />
                        ) : (
                            <input
                                type={type}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                className="custom-input"
                                {...rest}
                            />
                        )}
                    </div>
                ))}

                <button onClick={handleSubmitEdit} className="w-full custom-button primary-button">
                    {t('edit_event_modal.button')}
                </button>
            </div>
        </div>
    );
};
