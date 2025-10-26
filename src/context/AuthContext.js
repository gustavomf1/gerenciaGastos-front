// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Importamos o decoder
import { loginApi, getUserByIdApi } from "../services/api"; // Importa as funções da API

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tenta logar o usuário se ele já tiver um token válido
  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          // 'decodedToken.exp' está em segundos, Date.now() em milissegundos
          if (decodedToken.exp * 1000 > Date.now()) {
            // Token não expirou! Buscar dados do usuário
            // 'sub' é o ID do usuário (definido no seu GerarTokenJWT)
            const userData = await getUserByIdApi(decodedToken.sub);
            setUser(userData);
          } else {
            // Token expirou
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Falha ao carregar usuário do token", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (email, senha) => {
    try {
      // 1. Bater no /api/Seguranca
      const response = await loginApi(email, senha); // response é { access_token: "..." }
      const token = response.access_token;

      // 2. Salvar o token
      localStorage.setItem("authToken", token);

      // 3. Decodificar o token para pegar o ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub; // 'sub' = Subject (ID do usuário)

      // 4. Buscar os dados do usuário com o ID
      const userData = await getUserByIdApi(userId);

      // 5. Salvar o usuário no estado
      setUser(userData);
    } catch (error) {
      console.error("Falha no login", error);
      throw new Error("Email ou senha inválidos");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    // Você pode querer redirecionar o usuário para /login aqui
    // window.location.href = '/login';
  };

  // Se estiver carregando, mostra um loading
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado
export const useAuth = () => {
  return useContext(AuthContext);
};
