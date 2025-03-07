import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            Blog dedicado a trazer as últimas novidades e insights sobre
            Inteligência Artificial, programação e tecnologia.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Links Rápidos</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/categorias">Categorias</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <ul className="social-links">
            <li>
              <a href="https://github.com/nerdnoponto" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com/seu-perfil" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Receba as últimas atualizações diretamente no seu email.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Seu email" />
            <button type="submit">Inscrever</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} IA the News. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer; 