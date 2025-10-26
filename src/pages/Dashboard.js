import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo, {user.nome}!</h1>
        <p className={styles.subtitle}>O que gostaria de fazer hoje?</p>

        {/* Novo Grid de Navegação */}
        <div className={styles.navGrid}>
          {/* Card de Transações */}
          <Link to="/transacoes" className={styles.navCard}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <h3>Minhas Transações</h3>
            <p>Ver, adicionar e editar despesas e receitas.</p>
          </Link>

          {/* Card de Orçamentos */}
          <Link to="/orcamentos" className={styles.navCard}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
            <h3>Meus Orçamentos</h3>
            <p>Gerir os seus limites de gastos mensais.</p>
          </Link>

          {/* Card de Categorias */}
          <Link to="/categorias" className={styles.navCard}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <h3>Gerir Categorias</h3>
            <p>Criar e editar as suas categorias de gastos.</p>
          </Link>
        </div>

        <button onClick={handleLogout} className={styles.button}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;