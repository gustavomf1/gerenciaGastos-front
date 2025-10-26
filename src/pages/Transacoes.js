// src/pages/Transacoes.js
import React, { useState, useEffect } from 'react';
// 1. Importe o deleteTransacaoApi
import { getTransacoesApi, deleteTransacaoApi } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import styles from './Transacoes.module.css';

function TransacoesPage() {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para carregar as transações
  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      const dados = await getTransacoesApi();
      setTransacoes(dados);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Falha ao carregar transações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleDelete = async (id) => {
    // AVISO: window.confirm pode não funcionar em produção/iframes
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) return;

    try {
      await deleteTransacaoApi(id); // Função da API para deletar
      // Recarrega a lista para mostrar a mudança
      carregarTransacoes(); 
    } catch (err) {
      console.error(err);
      // 2. Troque o 'alert' pelo 'setError'
      setError('Erro ao excluir transação.'); 
    }
  };

  const handleEdit = (id) => {
    navigate(`/transacoes/editar/${id}`); // Rota para página de edição
  };

  // Componente de loading
  if (loading) {
     return (
      <div className={styles.pageContainer}>
        <div className={styles.contentBox}>
          <p className={styles.loadingText}>Carregando transações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBox}>
        {/* CABEÇALHO ATUALIZADO */}
        <div className={styles.header}>
          <h2 className={styles.title}>Minhas Transações</h2>
          
          {/* Div para alinhar os botões à direita */}
          <div className={styles.headerActions}>
            <Link to="/transacoes/nova" className={styles.newButton}>
              + Nova Transação
            </Link>
            <Link to="/dashboard" className={styles.backLink}>
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
        {/* FIM DO CABEÇALHO ATUALIZADO */}

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor (R$)</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.length > 0 ? (
                transacoes.map((transacao) => (
                  <tr key={transacao.id}>
                    <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                    <td>{transacao.descricao}</td>
                    <td className={transacao.tipo === 'Despesa' ? styles.despesa : styles.receita}>
                      {transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td>{transacao.categoria}</td>
                    <td>{transacao.tipo}</td>
                    <td>
                      {/* Célula de Ações */}
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(transacao.id)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(transacao.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noDataText}>
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransacoesPage;

