import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            IA the News
          </Link>
        </div>

        <div className="header-center">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
        </div>

        <div className="header-right">
          <nav className="header-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/categorias">Categorias</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 