import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Adicionar um produto ao carrinho
  const addToCart = (product) => {
    setItems((currentItems) => {
      // Verifica se o produto já está no carrinho
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se já existe, apenas aumenta a quantidade (+1)
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      // Se é um produto novo, adiciona ele com quantidade = 1
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  // Remover ou diminuir um produto do carrinho
  const removeFromCart = (productId) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(item => item.id === productId);
      
      if (!existingItem) return currentItems;

      // Se só tem 1 unidade, remove o item inteiro da lista
      if (existingItem.quantity === 1) {
        return currentItems.filter(item => item.id !== productId);
      }
      
      // Se tem mais de 1, apenas diminui a quantidade (-1)
      return currentItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  // Esvazia o carrinho totalmente (usado após confirmar o pagamento)
  const clearCart = () => {
    setItems([]);
  };

  // Constante derivada: Calcula a quantidade total de itens (ex: bolinha vermelha no ícone da sacola)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  // Constante derivada: Calcula o valor total em Reais (R$)
  const cartTotal = items.reduce((total, item) => {
    // Transforma strings como "54,00" em números matemáticos (54.00)
    const priceAsNumber = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(',', '.')) 
      : item.price;
      
    return total + (priceAsNumber * item.quantity);
  }, 0);

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        cartCount, 
        cartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nas telas
export const useCart = () => useContext(CartContext);