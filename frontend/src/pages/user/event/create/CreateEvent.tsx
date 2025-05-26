import React, { useEffect, useState } from 'react';
import { useUserEvents } from '../../../../hooks/useUserEvents';
import { useCategories } from '../../../../hooks/useCategories';
import { CategorySelect } from '../../../../shared/category/CategorySelect';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../../routes/routes';
import { useAi } from '../../../../hooks/useAi';
import { Loader } from '../../../../shared/loader/Loader';
import { BsStars } from "react-icons/bs";

export const CreateEvent = () => {
    const { handleCreateEvent, creating } = useUserEvents();
    const { fetchAllCategories } = useCategories();
    const { generateEventAiDescription, loading: iaLoader } = useAi()
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

    const generateDescription = async () => {
        if (!formData.title) {
            toast.error("Primero escribe un título.");
            return;
        }

        try {
            console.log("Form title ", formData.title)
            const response = await generateEventAiDescription(formData.title)
            console.log("Response ", response)

            if (response) {
                setFormData(prev => ({ ...prev, description: response }));
            }
        } catch (error) {
            toast.error("Error generando la descripción.");
        }
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
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-[var(--box-shadow-medium)]">
                <h2 className="text-2xl font-bold mb-6">Crear Evento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="custom-input"
                    />

                    <div className="relative">
                        <textarea
                            name="description"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={handleChange}
                            className="custom-input !pr-12"
                        />

                        <button
                            type="button"
                            onClick={generateDescription}
                            disabled={iaLoader || !formData.title}
                            className={`absolute right-4 top-4 p-1 rounded transition ${iaLoader ||         !formData.title ?
                                'cursor-not-allowed opacity-50'
                                : 'cursor-pointer hover:text-[var(--primary-color)]'
                            }`}
                        >
                            {iaLoader ? <Loader /> : <BsStars size="20" />}
                        </button>
                    </div>

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
                        className="custom-input"
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
                            className="custom-input"
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                            className="custom-input"
                        />
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            required
                            className="custom-input"
                        />
                        <input
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            required
                            className="custom-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="custom-button primary-button w-full text-center"
                    >
                        {creating ? "Creando..." : "Crear Evento"}
                    </button>
                </form>
            </div>
        </>
    );
};
