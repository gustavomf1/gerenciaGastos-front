// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import TransacoesPage from './pages/Transacoes';
import OrcamentosPage from './pages/Orcamentos';
// 1. IMPORTAR A NOVA PÁGINA
import EditarTransacaoPage from './pages/EditarTransacao'; 
import EditarOrcamentoPage from './pages/EditarOrcamento';
import CriarTransacaoPage from './pages/CriarTransacao';
import CriarOrcamentoPage from './pages/CriarOrcamento';
import CategoriasPage from './pages/Categorias';
import CriarCategoriaPage from './pages/CriarCategoria';
import EditarCategoriaPage from './pages/EditarCategoria';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota Pública */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transacoes" element={<TransacoesPage />} />
            <Route path="/transacoes/nova" element={<CriarTransacaoPage />} />
            {/* 2. ADICIONAR A NOVA ROTA (com parâmetro :id) */}
            <Route path="/transacoes/editar/:id" element={<EditarTransacaoPage />} />
            <Route path="/orcamentos" element={<OrcamentosPage />} /> {/* <<< 2. ADICIONE ESTA LINHA */}
            <Route path="/orcamentos/editar/:id" element={<EditarOrcamentoPage />} /> {/* <<< 2. NOVA ROTA */}
            <Route path="/orcamentos/nova" element={<CriarOrcamentoPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/categorias/nova" element={<CriarCategoriaPage />} />
            <Route path="/categorias/editar/:id" element={<EditarCategoriaPage />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;