import React from 'react';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

export const EventDateTimeInputs = ({ formData, handleChange }: Props) => (
  <>
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
  </>
);
