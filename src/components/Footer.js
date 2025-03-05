import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o email para sua API
    console.log('Email cadastrado:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>IA the News</h3>
          <p>Seu portal de notícias geradas por inteligência artificial.</p>
        </div>

        <div className="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Receba as últimas notícias diretamente no seu email.</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Inscrever-se</button>
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