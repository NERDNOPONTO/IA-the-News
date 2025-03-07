import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';

function Categorias() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getPosts(1, 100); // Busca mais posts para ter uma amostra maior
        // Filtra categorias undefined e vazias
        const uniqueCategories = [...new Set(
          response.posts
            .map(post => post.category)
            .filter(category => category && category.trim() !== '')
        )];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Erro ao carregar categorias');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Carregando categorias...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="categorias-container">
      <h1>Categorias</h1>
      <div className="categorias-grid">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="categoria-card">
              <h2>{category}</h2>
              <p>Artigos relacionados a {category.toLowerCase()}</p>
            </div>
          ))
        ) : (
          <div className="no-categories">
            <p>Nenhuma categoria encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorias; 