import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './src/controller/AuthController';
import { CartProvider } from './src/store/Cart';

import HomeScreen from './src/view/homeView';
import MenuScreen from './src/view/MenuScreen';
import LoginScreen from './src/view/LoginScreen';
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
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
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