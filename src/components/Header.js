import React from 'react';
import './Header.css';

function Header({ onSearch }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>IA the News</h1>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar posts..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/categorias">Categorias</a></li>
            <li><a href="/contato">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 