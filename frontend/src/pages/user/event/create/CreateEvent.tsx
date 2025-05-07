import React, { useEffect, useState } from 'react';
import { useUserEvents } from '../../../../hooks/useUserEvents';
import { useCategories } from '../../../../hooks/useCategories';
import { CategorySelect } from '../../../../shared/category/CategorySelect';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../../routes/routes';
import BackToDashboard from '../../../../shared/redirect/BackToDashboard';

export const CreateEvent = () => {
    const { handleCreateEvent, creating } = useUserEvents();
    const { fetchAllCategories } = useCategories();
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category_id: null,
        participant_limit: null,
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category_id) {
            toast.error("Selecciona una categoría.");
            return;
        }

        const eventData = {
            ...formData,
            category_id: formData.category_id,
            participant_limit: formData.participant_limit ? Number(formData.participant_limit) : undefined,
        };

        const success = await handleCreateEvent(eventData);
        if (success) {
            navigate(ROUTES.dashboard);
        }
    };

    return (
        <>
            <BackToDashboard />
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-6">Crear Evento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <CategorySelect
                        categoryId={Number(formData.category_id)}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="participant_limit"
                        placeholder="Límite de participantes"
                        value={Number(formData.participant_limit)}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        min={1}
                        max={20}
                    />

                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        {creating ? "Creando..." : "Crear Evento"}
                    </button>
                </form>
            </div>
        </>
    );
};
