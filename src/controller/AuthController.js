import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação de Cliente (App padrão)
        if (email === 'lucas@gmail.com' && password === '123456') {
          const clientUser = { id: 1, name: 'Lucas', role: 'CLIENT', email };
          setUser(clientUser);
          resolve(clientUser);
        } 
        // Validação de Atendente / Caixa (AdminDashboard)
        else if (email === 'joao@gmail.com' && password === '123456') {
          const adminUser = { id: 2, name: 'João', role: 'ADMIN', email };
          setUser(adminUser);
          resolve(adminUser);
        } 
        // Validação de Cozinha (KitchenDisplay)
        else if (email === 'augusto@gmail.com' && password === '123456') {
          const kitchenUser = { id: 3, name: 'Augusto', role: 'KITCHEN', email };
          setUser(kitchenUser);
          resolve(kitchenUser);
        } 
        // Falha
        else {
          reject(new Error('Credenciais inválidas. Tente usar as contas de demonstração.'));
        }
      }, 800); // Simulando tempo de requisição
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);