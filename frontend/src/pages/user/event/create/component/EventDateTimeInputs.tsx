import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const EventDateTimeInputs = ({ formData, handleChange }: Props) => {
  const { t } = useTranslation('event')

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="start_date" className="custom-label">
            {t('create.label.start_date')}
          </label>
          <input
            id="start_date"
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>

        <div className="flex flex-col flex-1 mt-4 sm:mt-0">
          <label htmlFor="end_date" className="custom-label">
            {t('create.label.end_date')}
          </label>
          <input
            id="end_date"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="start_time" className="custom-label">
            {t('create.label.start_time')}
          </label>
          <input
            id="start_time"
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>

        <div className="flex flex-col flex-1 mt-4 sm:mt-0">
          <label htmlFor="end_time" className="custom-label">
            {t('create.label.end_time')}
          </label>
          <input
            id="end_time"
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="custom-input"
          />
        </div>
      </div>
    </>
  )
}

