// src/pages/CriarOrcamento.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrcamentoApi } from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import styles from './Login.module.css'; // Reutilizando estilos do login

function CriarOrcamentoPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Para pegar o usuarioId

  // Estados do formulário (baseado no OrcamentoDto)
  const [titulo, setTitulo] = useState('');
  const [valorLimite, setValorLimite] = useState('');
  const [mes, setMes] = useState(new Date().getMonth() + 1); // Default para o mês atual
  const [ano, setAno] = useState(new Date().getFullYear()); // Default para o ano atual

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || !user.id) {
      setError('Usuário não encontrado. Faça login novamente.');
      return;
    }

    // Monta o DTO de Criação
    const novoOrcamento = {
      titulo,
      usuarioId: user.id,
      valorLimite: parseFloat(valorLimite),
      valorAtual: 0, // Um novo orçamento começa com 0
      mes: parseInt(mes),
      ano: parseInt(ano),
    };

    try {
      await createOrcamentoApi(novoOrcamento);
      navigate('/orcamentos'); // Volta para a lista de orçamentos
    } catch (err) {
      console.error(err);
      setError('Erro ao criar orçamento. Verifique os dados enviados.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Novo Orçamento</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="titulo">Título:</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={styles.input}
              placeholder="Ex: Orçamento de Supermercado"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="valorLimite">Valor Limite (R$):</label>
            <input
              id="valorLimite"
              type="number"
              step="0.01"
              value={valorLimite}
              onChange={(e) => setValorLimite(e.target.value)}
              className={styles.input}
              placeholder="Ex: 500.00"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="mes">Mês:</label>
            <input
              id="mes"
              type="number"
              min="1"
              max="12"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ano">Ano:</label>
            <input
              id="ano"
              type="number"
              min="2000"
              max="2100"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Criar Orçamento</button>
          <Link to="/orcamentos" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CriarOrcamentoPage;