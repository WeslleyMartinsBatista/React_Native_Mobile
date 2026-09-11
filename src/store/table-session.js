import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const TableSessionContext = createContext({});

export const TableSessionProvider = ({ children }) => {
  const [tableNumber, setTableNumber] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);

  // Função chamada ao escanear o QR Code
  const openTableSession = (number) => {
    setTableNumber(number);
    setSessionActive(true);
    // Aqui você também poderia registrar a hora de início da mesa
  };

  // Função chamada quando o cliente paga a conta e vai embora
  const closeTableSession = () => {
    setTableNumber(null);
    setSessionActive(false);
  };

  return (
    <TableSessionContext.Provider 
      value={{ 
        tableNumber, 
        sessionActive, 
        openTableSession, 
        closeTableSession 
      }}
    >
      {children}
    </TableSessionContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nas telas
export const useTableSession = () => useContext(TableSessionContext);