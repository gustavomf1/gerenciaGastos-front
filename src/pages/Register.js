// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../services/api'; // (Endpoint que já existe no seu api.js)
import styles from './Login.module.css'; // Vamos reutilizar os estilos do Login

function RegisterPage() {
  const navigate = useNavigate();

  // Estados do formulário (baseado no UsuarioDto)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação simples no frontend
    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    // Monta o DTO de Criação (UsuarioDto)
    // NOTA: Estamos a enviar a senha em texto puro para o campo 'senhaHash'.
    // O seu backend C# está à espera disto, como vimos no Login.
    const novoUsuario = {
      nome,
      email,
      senhaHash: senha, 
    };

    try {
      await registerApi(novoUsuario);
      // Sucesso! Envia o utilizador para o Login
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Erro ao criar conta. O email já pode estar em uso.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Criar Conta</h2>
        
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
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmaSenha">Confirmar Senha:</label>
            <input
              id="confirmaSenha"
              type="password"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Registrar</button>
          
          <Link to="/login" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Já tem uma conta? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;