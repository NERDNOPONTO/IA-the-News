import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import api from './services/api';
import './App.css';
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import AdSpace from './components/AdSpace';
import { telegramAutoNotification } from './services/TelegramAutoNotification';
import { getPosts } from './services/api';
import Sobre from './pages/Sobre';
import Categorias from './pages/Categorias';
import Contato from './pages/Contato';

function AppContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const checkServerConnection = async () => {
    try {
      const response = await api.get('/test');
      console.log('Status do servidor:', response.data);
      setIsConnected(true);
      return true;
    } catch (err) {
      console.error('Erro ao verificar conexão com o servidor:', err);
      setIsConnected(false);
      return false;
    }
  };

  const fetchPosts = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isConnected) {
        const connected = await checkServerConnection();
        if (!connected) {
          throw new Error('Não foi possível conectar ao servidor');
        }
      }
      
      console.log('Tentando buscar posts...');
      const response = await getPosts(page);
      console.log('Resposta da API:', response);
      
      setPosts(response.posts);
      setTotalPages(response.pagination.pages);
      setCurrentPage(page);
      return response.posts;
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      setError(err.message || 'Erro ao carregar posts. Por favor, tente novamente.');
      setPosts([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    console.log('Iniciando aplicação...');
    console.log('Ambiente:', process.env.NODE_ENV);
    
    const initializeApp = async () => {
      try {
        await checkServerConnection();
        await fetchPosts();
        telegramAutoNotification.startChecking(fetchPosts);
      } catch (err) {
        console.error('Erro ao inicializar aplicação:', err);
        setError('Erro ao inicializar a aplicação. Por favor, tente novamente.');
      }
    };

    initializeApp();

    return () => {
      telegramAutoNotification.stopChecking();
    };
  }, [fetchPosts]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchPosts(page);
  };

  if (initialLoad || loading) {
    return null;
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/categorias">Categorias</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
      <main className="main-content">
        <div className="content-wrapper">
          <AdSpace position="top" />
          <Routes location={location}>
            <Route path="/" element={
              error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <button onClick={() => fetchPosts(currentPage)} className="retry-button">
                    Tentar Novamente
                  </button>
                </div>
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
              )
            } />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename="/IA-the-News">
      <AppContent />
    </Router>
  );
}

export default App;