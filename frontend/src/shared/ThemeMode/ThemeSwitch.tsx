import React from 'react';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext';

import { FiSun, FiMoon } from 'react-icons/fi';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Light</span>

      <label className="relative inline-block w-14 h-7">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="opacity-0 w-0 h-0 peer"
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 bg-[var(--border-color)] rounded-full transition-colors duration-300 peer-checked:bg-[var(--primary-color)]" />
        <span className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center bg-white text-black rounded-full text-xs transition-transform duration-300 peer-checked:translate-x-7">
          {theme === 'light' ? <FiSun /> : <FiMoon />}
        </span>
      </label>

      <span className="text-sm font-medium">Dark</span>
    </div>
  );
};
