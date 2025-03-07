import React, { useState } from 'react';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Dados do formulário:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contato-container">
      <h1>Contato</h1>
      <div className="contato-content">
        <form onSubmit={handleSubmit} className="contato-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensagem">Mensagem:</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contato; 