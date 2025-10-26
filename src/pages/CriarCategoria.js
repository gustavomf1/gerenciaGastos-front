// src/pages/CriarCategoria.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCategoriaApi } from '../services/api';
import styles from './Login.module.css'; // Reutilizando estilos do login

function CriarCategoriaPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Monta o DTO de Criação (CategoriaDto)
    const novaCategoria = {
      nome,
      descricao,
    };

    try {
      await createCategoriaApi(novaCategoria);
      navigate('/categorias'); // Volta para a lista
    } catch (err) {
      console.error(err);
      setError('Erro ao criar categoria.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Nova Categoria</h2>
        
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
              placeholder="Ex: Alimentação"
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
              placeholder="Ex: Gastos com supermercado e restaurantes"
            />
          </div>

          <button type="submit" className={styles.button}>Criar Categoria</button>
          <Link to="/categorias" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CriarCategoriaPage;