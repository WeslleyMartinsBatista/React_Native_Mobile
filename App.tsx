import React from 'react';
// 1. Altere a importação para puxar a HomeScreen
import HomeScreen from './src/screens/Home'; 

export default function App() {
  // 2. Substitua o retorno para renderizar a nova tela
  return <HomeScreen />;
}
