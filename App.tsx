import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/controller/AuthController';
import { CartProvider } from './src/store/Cart';

import homeView from './src/view/homeView';
import cardapioView from './src/view/cardapioView';
import loginView from './src/view/loginView';
import RegisterScreen from './src/view/RegisterScreen';
import CheckoutScreen from './src/view/CheckoutScreen';
import AttendantDashboardScreen from './src/view/AttendantDashboardScreen';
import KitchenDisplayScreen from './src/view/KitchenDisplayScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="homeView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="homeView" component={homeView} />
            <Stack.Screen name="cardapioView" component={cardapioView} />
            <Stack.Screen name="loginView" component={loginView} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="AdminDashboard" component={AttendantDashboardScreen} />
            <Stack.Screen name="KitchenDisplay" component={KitchenDisplayScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}