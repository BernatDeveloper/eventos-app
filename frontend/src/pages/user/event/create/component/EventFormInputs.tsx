import React from 'react';
import { CategorySelect } from '../../../../../shared/category/CategorySelect';
import { useTranslation } from 'react-i18next';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const EventFormInputs = ({ formData, handleChange }: Props) => {
  const { t } = useTranslation('event')

  return (
    <>
      <label htmlFor="title" className="custom-label">
        {t('create.label.title')}
      </label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder={t('create.placeholder.title')}
        value={formData.title}
        onChange={handleChange}
        required
        className="custom-input"
        maxLength={50}
      />

      <label htmlFor="category_id" className="custom-label">
        {t('create.label.category')}
      </label>
      <CategorySelect
        categoryId={Number(formData.category_id)}
        onChange={handleChange}
        required
      />

      <label htmlFor="participant_limit" className="custom-label">
        {t('create.label.participant_limit')}
      </label>
      <input
        id="participant_limit"
        type="number"
        name="participant_limit"
        value={Number(formData.participant_limit)}
        onChange={handleChange}
        className="custom-input"
        min={1}
        max={20}
      />
    </>
  )
}

