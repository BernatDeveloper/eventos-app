import React from 'react';
import { BsStars } from 'react-icons/bs';
import { Loader } from '../../../../../shared/loader/Loader';
import { useTranslation } from 'react-i18next';

interface Props {
  description: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  generateDescription: () => void;
  loading: boolean;
  title: string;
}

export const EventDescriptionInput = ({ description, onChange, generateDescription, loading, title }: Props) => {
  const { t } = useTranslation('event')
  return (
    <div className="relative">
      <textarea
        name="description"
        placeholder={t('create.placeholder.desc')}
        value={description}
        onChange={onChange}
        className="custom-input min-h-40 !pr-12"
      />

      <button
        type="button"
        onClick={generateDescription}
        disabled={loading || !title}
        className={`absolute right-4 top-4 p-1 rounded transition ${loading || !title ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-[var(--primary-color)]'
          }`}
      >
        {loading ? <Loader /> : <BsStars size="20" />}
      </button>
    </div>
  )
};
