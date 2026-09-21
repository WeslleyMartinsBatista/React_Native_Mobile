import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/controller/AuthController';
import { CartProvider } from './src/store/Cart';

import homeView from './src/view/homeView';
import cardapioView from './src/view/cardapioView';
import loginView from './src/view/loginView';
import registerView from './src/view/registerView';
import CheckoutScreen from './src/view/checkoutView';
import AttendantDashboardScreen from './src/view/atendimentoView';
import KitchenDisplayScreen from './src/view/cozinhaView';

// Definição das rotas
export type RootStackParamList = {
  homeView: undefined;
  cardapioView: { category: string } | undefined;
  loginView: undefined;
  registerView: undefined;
  Checkout: undefined;
  AdminDashboard: undefined;
  KitchenDisplay: undefined;
};

// Configuração de Linking para mapear as URLs no navegador
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:8081', 'http://localhost:19006'],
  config: {
    screens: {
      homeView: '',
      loginView: 'loginView',
      registerView: 'registerView',
      cardapioView: 'cardapioView',
      Checkout: 'Checkout',
      AdminDashboard: 'AdminDashboard',
      KitchenDisplay: 'KitchenDisplay',
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* Adicionado a prop linking no NavigationContainer */}
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="homeView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="homeView" component={homeView} />
            <Stack.Screen name="cardapioView" component={cardapioView} />
            <Stack.Screen name="loginView" component={loginView} />
            <Stack.Screen name="registerView" component={registerView} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="AdminDashboard" component={AttendantDashboardScreen} />
            <Stack.Screen name="KitchenDisplay" component={KitchenDisplayScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}