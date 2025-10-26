// src/pages/EditarCategoria.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategoriaByIdApi, updateCategoriaApi } from '../services/api';
import styles from './Login.module.css'; // Reutilizando estilos

function EditarCategoriaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const categoriaData = await getCategoriaByIdApi(id);

        // Preencher formulário
        setNome(categoriaData.nome);
        setDescricao(categoriaData.descricao || '');
        
        setError('');
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar dados da categoria.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Monta o DTO de atualização
    const categoriaAtualizada = {
      id: parseInt(id),
      nome,
      descricao,
    };

    try {
      await updateCategoriaApi(categoriaAtualizada); 
      navigate('/categorias');
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar categoria.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Editar Categoria</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="descricao">Descrição (Opcional):</label>
            <input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>Salvar Alterações</button>
          <Link to="/categorias" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditarCategoriaPage;