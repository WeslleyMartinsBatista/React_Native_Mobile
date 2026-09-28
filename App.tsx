import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/controller/AuthController';
import { CartProvider } from './src/store/Cart';

import homeView from './src/view/homeView';
import cardapioView from './src/view/cardapioView';
import LoginView from './src/view/loginView'; // Importação do LoginScreen
import registerView from './src/view/registerView';
import checkoutView from './src/view/checkoutView';
import atendimentoView from './src/view/atendimentoView';
import cozinhaView from './src/view/cozinhaView';
import adminView from './src/view/adminView';

// Definição das rotas
export type RootStackParamList = {
  homeView: { table?: string } | undefined;
  cardapioView: { category?: string } | undefined;
  loginView: undefined;
  registerView: undefined;
  Checkout: { orderType?: string } | undefined;
  adminView: undefined;
  atendimentoView: undefined;
  cozinhaView: undefined;
};

// Configuração de Linking para mapear as URLs no navegador
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:8081', 'http://localhost:19006', 'https://seu-app.vercel.app'],
  config: {
    screens: {
      homeView: '',
      cardapioView: 'cardapioView',
      loginView: 'login',
      registerView: 'register',
      Checkout: 'checkout',
      adminView: 'adminView',
      atendimentoView: 'atendimentoView',
      cozinhaView: 'cozinhaView',
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="homeView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="homeView" component={homeView} />
            <Stack.Screen name="cardapioView" component={cardapioView} />
            <Stack.Screen name="loginView" component={LoginView} />
            <Stack.Screen name="registerView" component={registerView} />
            <Stack.Screen name="Checkout" component={checkoutView} />
            <Stack.Screen name="adminView" component={adminView} />
            <Stack.Screen name="atendimentoView" component={atendimentoView} />
            <Stack.Screen name="cozinhaView" component={cozinhaView} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}