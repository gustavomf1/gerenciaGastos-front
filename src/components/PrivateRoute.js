// src/components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa nosso hook

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Pergunta ao context: "Estamos logados?"

  // Se estiver autenticado, 'Outlet' renderiza o componente filho (ex: a Dashboard)
  // Se não, 'Navigate' redireciona o usuário para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
