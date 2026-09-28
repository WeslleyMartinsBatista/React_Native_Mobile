import React, { createContext, useState, useContext } from 'react';
import { MockDatabase } from '../database/mockDatabase';

// Criação do Contexto
export const AuthContext = createContext({});

// Provedor de Autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (emailInput, passwordInput) => {
    const response = await MockDatabase.login(emailInput, passwordInput);

    if (response.success) {
      setUser(response.user);
      console.log('Utilizador logado:', response.user);
      return response;
    } else {
      alert(response.message);
      return response;
    }
  };

  const handleRegister = async (nameInput, emailInput, passwordInput) => {
    const response = await MockDatabase.register(nameInput, emailInput, passwordInput);

    if (response.success) {
      console.log('Novo registo:', response.user);
      return response;
    } else {
      alert(response.message);
      return response;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para facilitar o uso do AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthProvider;