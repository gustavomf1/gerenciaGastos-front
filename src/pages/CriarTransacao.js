// src/pages/CriarTransacao.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTransacaoApi, getCategoriasApi, getOrcamentosApi } from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import styles from './Login.module.css'; // Reutilizando estilos do login

function CriarTransacaoPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Para pegar o usuarioId

  // Estados do formulário (baseado no TransacaoCreateDto)
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]); // Default para hoje
  const [tipo, setTipo] = useState(1); // 1 = Despesa (default)
  const [categoriaId, setCategoriaId] = useState('');
  const [orcamentoId, setOrcamentoId] = useState(''); // Default é 'Nenhum'

  // Dropdowns
  const [categorias, setCategorias] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carregar dados dos dropdowns
  useEffect(() => {
    const carregarDropdowns = async () => {
      try {
        setLoading(true);
        const [categoriasData, orcamentosData] = await Promise.all([
          getCategoriasApi(),
          getOrcamentosApi()
        ]);
        setCategorias(categoriasData);
        setOrcamentos(orcamentosData);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar categorias ou orçamentos.');
      } finally {
        setLoading(false);
      }
    };
    carregarDropdowns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || !user.id) {
      setError('Usuário não encontrado. Faça login novamente.');
      return;
    }
    if (!categoriaId) {
      setError('Por favor, selecione uma categoria.');
      return;
    }

    // Monta o DTO de Criação
    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      data: new Date(data),
      tipo: parseInt(tipo),
      categoriaId: parseInt(categoriaId),
      usuarioId: user.id,
      orcamentoId: orcamentoId ? parseInt(orcamentoId) : null
    };

    try {
      await createTransacaoApi(novaTransacao);
      navigate('/transacoes'); // Volta para a lista
    } catch (err) {
      console.error(err);
      setError('Erro ao criar transação. Verifique os dados enviados.');
    }
  };

  if (loading) {
     return (
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Nova Transação</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="descricao">Descrição:</label>
            <input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="valor">Valor (R$):</label>
            <input
              id="valor"
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="data">Data:</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={styles.input}
              required
            >
              <option value={1}>Despesa</option>
              <option value={0}>Receita</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className={styles.input}
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="orcamento">Orçamento (Opcional):</label>
            <select
              id="orcamento"
              value={orcamentoId}
              onChange={(e) => setOrcamentoId(e.target.value)}
              className={styles.input}
            >
              <option value="">Nenhum</option>
              {orcamentos.map(o => (
                <option key={o.id} value={o.id}>{o.titulo}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.button}>Adicionar Transação</button>
          <Link to="/transacoes" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CriarTransacaoPage;