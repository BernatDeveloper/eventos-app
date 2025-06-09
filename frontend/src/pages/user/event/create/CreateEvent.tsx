import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserEvents } from '../../../../hooks/useUserEvents';
import { useCategories } from '../../../../hooks/useCategories';
import { useAi } from '../../../../hooks/useAi';
import { ROUTES } from '../../../../routes/routes';
import { EventFormInputs } from './component/EventFormInputs';
import { EventDescriptionInput } from './component/EventDescriptionInput';
import { EventDateTimeInputs } from './component/EventDateTimeInputs';
import BackToDashboard from '../../../../shared/redirect/BackToDashboard';
import { useTranslation } from 'react-i18next';

export const CreateEvent = () => {
  const { handleCreateEvent, creating } = useUserEvents();
  const { fetchAllCategories } = useCategories();
  const { generateEventAiDescription, loading: iaLoader } = useAi();
  const navigate = useNavigate();
  const { t } = useTranslation('event')

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

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateDescription = async () => {
    const response = await generateEventAiDescription(formData.title);
    if (response) {
      setFormData(prev => ({ ...prev, description: response }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="max-w-xl p-[var(--spacing-lg)] mx-auto bg-[var(--background-secondary-color)] rounded shadow-[var(--box-shadow-medium)]">
        <h2 className="text-2xl font-bold mb-6">{t("create.title")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EventFormInputs formData={formData} handleChange={handleChange} />
          <EventDescriptionInput
            description={formData.description}
            title={formData.title}
            onChange={handleChange}
            generateDescription={generateDescription}
            loading={iaLoader}
          />
          <EventDateTimeInputs formData={formData} handleChange={handleChange} />

          <button
            type="submit"
            disabled={creating}
            className="custom-button primary-button w-full text-center"
          >
            {creating ? t("create.loading_button") : t("create.button")}
          </button>
        </form>
      </div>
    </>
  );
};
