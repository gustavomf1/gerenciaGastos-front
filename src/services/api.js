// src/services/api.js
import axios from 'axios';

// 1. Instância do axios
const api = axios.create({
  baseURL: 'https://localhost:7032/api' // Sua URL de backend
});

// 2. Interceptor (para enviar o token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- SegurancaController ---
export const loginApi = async (email, senha) => {
  const response = await api.post('/Seguranca', { email: email, senhaHash: senha });
  return response.data;
};

// --- UsuarioController ---
export const registerApi = async (usuarioData) => {
  const response = await api.post('/Usuario', usuarioData);
  return response.data;
};

export const getUserByIdApi = async (id) => {
  const response = await api.get(`/Usuario/${id}`);
  return response.data;
};

// --- TransacaoController ---
export const getTransacoesApi = async () => {
  const response = await api.get('/Transacao');
  return response.data; 
};

// NOVO: Busca uma transação específica pelo ID
export const getTransacaoByIdApi = async (id) => {
  const response = await api.get(`/Transacao/${id}`);
  // Precisamos que a API retorne o CategoriaId aqui
  // O seu TransacaoResponseDto atual retorna a string "Categoria"
  // Você talvez precise de um DTO novo (ex: TransacaoEditDto) que retorne o ID
  // Por enquanto, vou assumir que o 'getById' retorna o DTO de update
  return response.data; 
};

export const createTransacaoApi = async (transacaoData) => {
  const response = await api.post('/Transacao', transacaoData);
  return response.data;
};

// NOVO: Atualiza uma transação
export const updateTransacaoApi = async (id, transacaoData) => {
  // transacaoData é um TransacaoUpdateDto
  const response = await api.put(`/Transacao/${id}`, transacaoData);
  return response.data;
};

// NOVO: Deleta uma transação
export const deleteTransacaoApi = async (id) => {
  await api.delete(`/Transacao/${id}`);
};

// --- CategoriaController ---
export const getCategoriasApi = async () => {
  const response = await api.get('/Categoria');
  return response.data;
};

// --- OrcamentoController ---
export const getOrcamentosApi = async () => {
    const response = await api.get('/Orcamento');
    return response.data;
};

export const getOrcamentoByIdApi = async (id) => {
  const response = await api.get(`/Orcamento/${id}`);
  return response.data;
};

export const createOrcamentoApi = async (orcamentoData) => {
  // orcamentoData é um OrcamentoDto
  const response = await api.post('/Orcamento', orcamentoData);
  return response.data;
};

// NOVO: Atualiza um orçamento (seu controller usa [HttpPut] sem ID na rota)
export const updateOrcamentoApi = async (orcamentoData) => {
  // O seu controller espera o DTO completo, incluindo o ID
  const response = await api.put('/Orcamento', orcamentoData);
  return response.data;
};

// NOVO: Deleta um orçamento
export const deleteOrcamentoApi = async (id) => {
  await api.delete(`/Orcamento/${id}`);
};

// NOVO: Busca uma categoria específica pelo ID
export const getCategoriaByIdApi = async (id) => {
  const response = await api.get(`/Categoria/${id}`);
  return response.data; // Espera-se que retorne CategoriaDto
};

// NOVO: Cria uma nova categoria
export const createCategoriaApi = async (categoriaData) => {
  // categoriaData é um CategoriaDto (sem o ID)
  const response = await api.post('/Categoria', categoriaData);
  return response.data;
};

// NOVO: Atualiza uma categoria (seu controller usa [HttpPut] sem ID na rota)
export const updateCategoriaApi = async (categoriaData) => {
  // O seu controller espera o DTO completo, incluindo o ID
  const response = await api.put('/Categoria', categoriaData);
  return response.data;
};

// NOVO: Deleta uma categoria
export const deleteCategoriaApi = async (id) => {
  await api.delete(`/Categoria/${id}`);
};

export default api;