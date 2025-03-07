import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import AdSpace from './components/AdSpace';
import { telegramAutoNotification } from './services/TelegramAutoNotification';

// Configuração do axios
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://blogbackend-4nz9.onrender.com/'  // Substitua pelo seu domínio no Render
    : 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para logs
api.interceptors.request.use(request => {
  console.log('Requisição:', request.method.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Resposta:', response.status, response.data);
    return response;
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/posts', {
        params: {
          page: currentPage,
          search: searchQuery
        }
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.pagination.pages);
      return response.data.posts;
    } catch (err) {
      console.error('Erro detalhado:', err);
      if (err.code === 'ECONNREFUSED') {
        setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
      } else if (err.response) {
        setError(err.response.data.error || 'Erro ao carregar posts. Por favor, tente novamente.');
      } else {
        setError('Erro ao carregar posts. Por favor, tente novamente.');
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Testa a conexão com o servidor
    api.get('/test')
      .then(() => {
        console.log('Conexão com o servidor estabelecida');
        fetchPosts();
      })
      .catch(err => {
        console.error('Erro ao conectar com o servidor:', err);
        setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
      });

    // Inicia a verificação automática
    telegramAutoNotification.startChecking(fetchPosts);

    // Limpa a verificação quando o componente é desmontado
    return () => {
      telegramAutoNotification.stopChecking();
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <div className="content-wrapper">
          <AdSpace position="top" />
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <PostList 
                posts={posts} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange}
              />
              <AdSpace />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;