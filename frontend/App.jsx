import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Image, Platform, StatusBar, StyleSheet, View } from "react-native";

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

        return <Image source={iconName} style={styles.tabIcon} />;
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

  const getToken = async () => {
    token = await SecureStore.getItemAsync("token");
  };

  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        AsyncStorage.setItem("hasLaunched", "true");
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  useEffect(() => {
    getToken();
  });

  return (
    <>
      <StatusBar
        barStyle={
          Platform.OS === "android"
            ? "dark-content"
            : "ios"
            ? "dark-content"
            : "default"
        }
        backgroundColor="white"
      />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={checkIfFirstLaunch() ? "Tutorial" : "Login"}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen
            name="RegisterAccount"
            component={RegisterAccountScreen}
          />
          <Stack.Screen
            name="RecoverAccount"
            component={RecoverAccountScreen}
          />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
});
