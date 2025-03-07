import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            IA the News
          </Link>
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>
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

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/sobre" onClick={() => setIsMenuOpen(false)}>Sobre</Link></li>
            <li><Link to="/categorias" onClick={() => setIsMenuOpen(false)}>Categorias</Link></li>
            <li><Link to="/contato" onClick={() => setIsMenuOpen(false)}>Contato</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 