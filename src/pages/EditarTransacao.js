// src/pages/EditarTransacao.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTransacaoByIdApi, updateTransacaoApi, getCategoriasApi, getOrcamentosApi } from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import styles from './Login.module.css'; // reutilizando estilos do login

function EditarTransacaoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Estados do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState(1); // 1 = Despesa, 0 = Receita
  const [categoriaId, setCategoriaId] = useState('');
  const [orcamentoId, setOrcamentoId] = useState(null); // novo campo

  // Dropdowns
  const [categorias, setCategorias] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]); // lista de orçamentos

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);

        // Buscar transação, categorias e orçamentos
        const [transacaoData, categoriasData, orcamentosData] = await Promise.all([
          getTransacaoByIdApi(id),
          getCategoriasApi(),
          getOrcamentosApi()
        ]);

        // Preencher formulário
        setDescricao(transacaoData.descricao);
        setValor(transacaoData.valor);
        setData(new Date(transacaoData.data).toISOString().split('T')[0]);
        setTipo(transacaoData.tipo === 'Despesa' ? 1 : 0);
        setCategoriaId(transacaoData.categoriaId || '');
        setOrcamentoId(transacaoData.orcamentoId || '');

        setCategorias(categoriasData);
        setOrcamentos(orcamentosData);

        setError('');
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar dados da transação.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

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

    const transacaoAtualizada = {
      id: parseInt(id),
      descricao,
      valor: parseFloat(valor),
      data: new Date(data),
      tipo: parseInt(tipo),
      categoriaId: parseInt(categoriaId),
      usuarioId: user.id,
      orcamentoId: orcamentoId ? parseInt(orcamentoId) : null
    };

    try {
      await updateTransacaoApi(id, transacaoAtualizada);
      navigate('/transacoes');
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar transação. Verifique os dados enviados.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <p>Carregando dados da transação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Editar Transação</h2>
        
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
            <label htmlFor="orcamento">Orçamento:</label>
            <select
              id="orcamento"
              value={orcamentoId || ''}
              onChange={(e) => setOrcamentoId(e.target.value)}
              className={styles.input}
            >
              <option value="">Nenhum</option>
              {orcamentos.map(o => (
                <option key={o.id} value={o.id}>{o.titulo}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.button}>Salvar Alterações</button>
          <Link to="/transacoes" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditarTransacaoPage;
