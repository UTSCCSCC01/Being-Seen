import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import Shelter from './screens/Shelter';
import LandingPage from './screens/landing_page';
import Login from './screens/Login';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * @function App
 * @module App
 * @description Main component of the app, container for all other components
 */

const Home = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Merchant" component={View} />
    <Tab.Screen name="Jobs" component={View} />
    <Tab.Screen name="Social Services" component={Shelter} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function App() {
  let token;

  useEffect(() => {
    const getToken = async () => {
      token = await SecureStore.getItemAsync('token');
    };
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Landing" component={LandingPage} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Login />
  );
}
