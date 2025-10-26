// src/pages/Orcamentos.js
import React, { useState, useEffect } from 'react';
import { getOrcamentosApi, deleteOrcamentoApi } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
import styles from './Orcamentos.module.css'; 

function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    carregarOrcamentos();
  }, []);

  const carregarOrcamentos = async () => {
    try {
      setLoading(true);
      const dados = await getOrcamentosApi();
      setOrcamentos(dados);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Falha ao carregar orçamentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza? Isso pode desassociar transações.')) return;
    
    try {
      await deleteOrcamentoApi(id);
      carregarOrcamentos(); // Recarregar a lista
    } catch (err) {
      console.error("Erro ao deletar orçamento:", err);
      setError("Falha ao excluir orçamento.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/orcamentos/editar/${id}`);
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentBox}>
          <p className={styles.loadingText}>Carregando orçamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBox}>
        {/* CABEÇALHO ATUALIZADO */}
        <div className={styles.header}>
          <h2 className={styles.title}>Meus Orçamentos</h2>
          
          <div className={styles.headerActions}>
            <Link to="/orcamentos/nova" className={styles.newButton}>
              + Novo Orçamento
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
                <th>Título</th>
                <th>Mês/Ano</th>
                <th>Valor Limite (R$)</th>
                <th>Valor Atual (R$)</th>
                <th>Progresso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.length > 0 ? (
                orcamentos.map((orc) => {
                  const progresso = orc.valorLimite > 0 ? (orc.valorAtual / orc.valorLimite) * 100 : 0;
                  const progressoExcedido = progresso > 100;

                  return (
                    <tr key={orc.id}>
                      <td>{orc.titulo}</td>
                      <td>{orc.mes}/{orc.ano}</td>
                      <td>{orc.valorLimite.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td style={{ color: progressoExcedido ? '#dc3545' : 'inherit', fontWeight: progressoExcedido ? 'bold' : 'normal' }}>
                        {orc.valorAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td style={{minWidth: '150px'}}>
                        <progress 
                          value={orc.valorAtual} 
                          max={orc.valorLimite} 
                          style={{width: '100%'}} 
                          className={progressoExcedido ? styles.progressExceeded : ''}
                        />
                        <span style={{fontSize: '0.9em'}}> ({progresso.toFixed(0)}%)</span>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.editButton}
                            onClick={() => handleEdit(orc.id)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(orc.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noDataText}>
                    Nenhum orçamento encontrado.
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

export default OrcamentosPage;