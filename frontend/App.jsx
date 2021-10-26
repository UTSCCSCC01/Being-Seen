import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "./constants/icons";
// import Shelter from "./screens/Shelter";
import LandingPage from "./screens/landing_page";
import ListFromAPI from "./screens/ListFromAPI";
import Login from "./screens/Login";
import RecoverAccountScreen from "./screens/RecoverAccountScreen";
import RegisterAccountScreen from "./screens/RegisterAccountScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * @function App
 * @module App
 * @description Main component of the app, container for all other components
 */

const Home = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({}) => {
        let iconName;

        if (route.name === "Merchants") {
          iconName = icons.merchants;
        } else if (route.name === "Jobs") {
          iconName = icons.jobs;
        } else if (route.name === "Profile") {
          iconName = icons.profile;
        } else if (route.name === "Social Services") {
          iconName = icons.social_services;
        } else if (route.name === "Education") {
          iconName = icons.education;
        }

        return <Image source={iconName} style={{ width: 30, height: 30 }} />;
      },
    })}
  >
    <Tab.Screen name="Merchants">
      {() => <ListFromAPI query="Merchant" />}
    </Tab.Screen>
    <Tab.Screen name="Jobs">{() => <ListFromAPI query="Job" />}</Tab.Screen>
    <Tab.Screen name="Profile" component={View} />
    <Tab.Screen name="Social Services">
      {() => <ListFromAPI query="Shelter" />}
    </Tab.Screen>
    <Tab.Screen name="Education">
      {() => <ListFromAPI query="Education" />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default function App() {
  let token;

  useEffect(() => {
    const getToken = async () => {
      token = await SecureStore.getItemAsync("token");
    };
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Login"
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen
          name="RegisterAccount"
          component={RegisterAccountScreen}
        />
        <Stack.Screen name="RecoverAccount" component={RecoverAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
