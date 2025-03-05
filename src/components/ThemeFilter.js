import React from 'react';
import './ThemeFilter.css';

const ThemeFilter = ({ themes, selectedTheme, onThemeChange }) => {
  return (
    <div className="theme-filter">
      <select
        value={selectedTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="theme-select"
      >
        <option value="">Todos os Temas</option>
        {themes.map(theme => (
          <option key={theme._id} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeFilter; 