import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingPage from "./screens/landing_page";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="LandingPage" component={LandingPage} />
        <Tab.Screen name="Profile" component={View} />
        <Tab.Screen name="Shelters" component={View} />
        <Tab.Screen name="Social Services" component={View} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
