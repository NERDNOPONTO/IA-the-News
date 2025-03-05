import React from 'react';
import './Sidebar.css';

function Sidebar({ onSearch }) {
  return (
    <aside>
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar posts..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </aside>
  );
}

export default Sidebar; 