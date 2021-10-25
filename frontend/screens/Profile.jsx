import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Button,
  ImageBackground,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator initialRouteName={MainProfile}>
      <Stack.Screen
        name = "MainProfile"
        options = {{ headerShown: true, headerTintColor: "#662997" }}
        component = {MainProfile}
      >
      </Stack.Screen>
      <Stack.Screen
        name = "EditProfile"
        options = {{ headerShown: true, headerTintColor: "#662997" }}
        component = {EditProfile}
      >

      </Stack.Screen>
    </Stack.Navigator>
  )
}

/**
 *
 * @function MainProfile Display profile tab
 * @module MainProfile Profile
 * @description full page of to display profile 
 */
function MainProfile( { route, navigation} ) {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [balance, setBalance] = useState(0);

  async function getProfile() {
    try {
      const URI = "http://10.0.2.2:3000/profiles/615a3f8470e6e721d8ee26d4";
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        URI,
        {
          method: 'Get',
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProfile()
      .then((response) => response.json()) // handles parsing
      .then((responseJSON) => { // handles setting
        setName(responseJSON.name);
        setStory(responseJSON.story);
        setBalance(responseJSON.balance);
      })
      .catch((error) => console.error(error));
  }, []);

  // TODO RETURN component
  return (
    <View>
      <Text>{name} {story} {balance}</Text>
      <Button title='Edit Profile' onPress = { 
          () => {
            navigation.navigate("EditProfile", 
              {
                name: name, story: story
              }
            )
          } 
        } />
    </View>
	  
  )
}

function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [story, setStory] = useState(route.params.story);
  return (
    <View>
      <Text>{name} {story}</Text>
    </View>
  )
}

export default Profile;