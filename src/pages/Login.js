// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. Adicione o 'Link'
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Bem-vindo!</h2>
        <p className={styles.subtitle}>Faça login para gerir os seus gastos.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha:</label>
            <input
              id="password"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        {/* 2. ADICIONE O LINK AQUI EMBAIXO */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#555' }}>
          Não tem uma conta?{' '}
          <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500' }}>
            Registre-se
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;