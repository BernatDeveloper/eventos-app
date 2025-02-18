import React from 'react';
import './App.css';

const App: React.FC = () => {
  const handleClick = () => {
    alert('¡Botón presionado!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-color)] transition-colors duration-500"
      >
        Haz clic aquí
      </button>
    </div>
  );
};

export default App;

