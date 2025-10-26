import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// CORREÇÃO: Usando caminhos relativos (../)
import { getOrcamentoByIdApi, updateOrcamentoApi } from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import styles from './Login.module.css'; // CORREÇÃO: (./) porque está na mesma pasta

function EditarOrcamentoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Estados do formulário (baseado no OrcamentoDto)
  const [titulo, setTitulo] = useState('');
  const [valorLimite, setValorLimite] = useState(0);
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState(new Date().getFullYear());

  // Valor atual não é editável, mas precisamos dele para o DTO
  const [valorAtual, setValorAtual] = useState(0); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const orcamentoData = await getOrcamentoByIdApi(id);

        // Preencher formulário
        setTitulo(orcamentoData.titulo);
        setValorLimite(orcamentoData.valorLimite);
        setValorAtual(orcamentoData.valorAtual); // Guardamos o valor atual
        setMes(orcamentoData.mes);
        setAno(orcamentoData.ano);
        
        setError('');
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar dados do orçamento.');
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

    // Monta o DTO de atualização
    const orcamentoAtualizado = {
      id: parseInt(id),
      titulo,
      usuarioId: user.id,
      valorLimite: parseFloat(valorLimite),
      valorAtual: valorAtual, // Enviamos o valor atual de volta (não foi modificado)
      mes: parseInt(mes),
      ano: parseInt(ano),
    };

    try {
      // Seu controller [HttpPut] espera o objeto inteiro
      await updateOrcamentoApi(orcamentoAtualizado); 
      navigate('/orcamentos');
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar orçamento. Verifique os dados enviados.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <p>Carregando dados do orçamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Editar Orçamento</h2>
        
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

          <button type="submit" className={styles.button}>Salvar Alterações</button>
          <Link to="/orcamentos" style={{ textAlign: 'center', display: 'block', marginTop: '1rem' }}>
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditarOrcamentoPage;