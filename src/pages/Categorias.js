// src/pages/Categorias.js
import React, { useState, useEffect } from 'react';
import { getCategoriasApi, deleteCategoriaApi } from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';
// Reutilizando os estilos da página de Orçamentos
import styles from './Orcamentos.module.css'; 

function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const dados = await getCategoriasApi();
      setCategorias(dados);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Falha ao carregar categorias.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza? Excluir uma categoria pode afetar transações existentes.')) return;
    
    try {
      await deleteCategoriaApi(id);
      carregarCategorias(); // Recarregar a lista
    } catch (err) {
      console.error("Erro ao deletar categoria:", err);
      setError("Falha ao excluir categoria. Verifique se ela não está sendo usada.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentBox}>
          <p className={styles.loadingText}>Carregando categorias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBox}>
        <div className={styles.header}>
          <h2 className={styles.title}>Minhas Categorias</h2>
          
          <div className={styles.headerActions}>
            <Link to="/categorias/nova" className={styles.newButton}>
              + Nova Categoria
            </Link>
            <Link to="/dashboard" className={styles.backLink}>
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length > 0 ? (
                categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.nome}</td>
                    <td>{cat.descricao || '—'}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(cat.id)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(cat.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.noDataText}>
                    Nenhuma categoria encontrada.
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

export default CategoriasPage;