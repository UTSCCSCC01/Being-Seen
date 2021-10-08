import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Shelter from "./screens/Shelter";
import LandingPage from "./screens/landing_page";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();

/**
 * @function App
 * @module App
 * @description Main component of the app, container for all other components
 */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={LandingPage} />
        <Tab.Screen name="Merchant" component={View} />
        <Tab.Screen name="Jobs" component={View} />
        <Tab.Screen name="Social Services" component={Shelter} />
        <Tab.Screen name="Profile" component={View} />
      </Tab.Navigator>
    </NavigationContainer>
    // <Login />
  );
}
