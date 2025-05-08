import { useState, useEffect } from 'react';
import { CloseModal } from '../../../../shared/modals/CloseModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => void;
  initialData?: { name: string; description?: string };
  mode: 'create' | 'edit';
}

export const CategoryModal = ({ isOpen, onClose, onSubmit, initialData, mode }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">
            {mode === 'create' ? 'Crear Categoría' : 'Editar Categoría'}
          </h2>
          <CloseModal onClose={onClose} />
        </div>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button onClick={handleSubmit} className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          {mode === 'create' ? 'Crear' : 'Guardar'}
        </button>
      </div>
    </div>
  );
};
