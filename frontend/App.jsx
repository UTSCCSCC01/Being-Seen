/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-empty-pattern */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Image, View } from "react-native";

import icons from "./constants/icons";
import LandingPage from "./screens/landing_page";
import ListFromAPI from "./screens/ListFromAPI";
import Login from "./screens/Login";
import RecoverAccountScreen from "./screens/RecoverAccountScreen";
import RegisterAccountScreen from "./screens/RegisterAccountScreen";
import TutorialScreen from "./screens/TutorialScreen";

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
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === "Merchants") {
          iconName = focused ? icons.merchants_filled : icons.merchants;
        } else if (route.name === "Jobs") {
          iconName = focused ? icons.jobs_filled : icons.jobs;
        } else if (route.name === "Profile") {
          iconName = focused ? icons.profile_filled : icons.profile;
        } else if (route.name === "Social Services") {
          iconName = focused
            ? icons.social_services_filled
            : icons.social_services;
        } else if (route.name === "Education") {
          iconName = focused ? icons.education_filled : icons.education;
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
  // eslint-disable-next-line no-unused-vars
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
        initialRouteName="Login"
        // initialRouteName="Home"
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
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
