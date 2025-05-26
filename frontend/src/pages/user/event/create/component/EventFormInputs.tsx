import React from 'react';
import { CategorySelect } from '../../../../../shared/category/CategorySelect';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const EventFormInputs = ({ formData, handleChange }: Props) => (
  <>
    <input
      type="text"
      name="title"
      placeholder="Título"
      value={formData.title}
      onChange={handleChange}
      required
      className="custom-input"
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
      className="custom-input"
      min={1}
      max={20}
    />
  </>
);
