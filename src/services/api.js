import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://blogbackend-alj2.onrender.com';

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Aumentado para 30 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log('Configuração da requisição:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers,
      params: config.params
    });
    return config;
  },
  (error) => {
    console.error('Erro na configuração da requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout na requisição');
      return Promise.reject(new Error('Tempo limite excedido. Tente novamente.'));
    }
    
    if (!error.response) {
      console.error('Erro de rede:', error.message);
      return Promise.reject(new Error('Erro de conexão. Verifique sua internet.'));
    }

    console.error('Erro na resposta:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method,
        headers: error.config?.headers,
        params: error.config?.params
      }
    });
    return Promise.reject(error);
  }
);

export const getPosts = async (page = 1, limit = 10, search = '', theme = '') => {
  try {
    console.log('Iniciando busca de posts com parâmetros:', { page, limit, search, theme });
    const response = await api.get('/api/posts', {
      params: { page, limit, search, theme }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    console.log('Buscando post com ID:', id);
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
};

export default api; 