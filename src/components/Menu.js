import React from 'react';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-logo">
          <h1>Blog Automático</h1>
        </div>
        <div className="menu-links">
          <a href="#home" className="active">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
    </nav>
  );
};

export default Menu; 