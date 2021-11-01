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
  TextInput,
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
        initialParams = {{
          name: '',
          story: '',
          balance: ''
        }}
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
  // TODO may need to implement initialParams
  useEffect(() => {
    getProfile()
      .then((response) => response.json()) // handles parsing
      .then((responseJSON) => { // handles setting
        setName(responseJSON.name);
        setStory(responseJSON.story);
        setBalance(responseJSON.balance);
      })
      .catch((error) => console.error(error));
  }, [route.params.name, route.params.story, route.params.balance]);

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

  async function update() {
    var bodyData = {
      story: story
    }
    const bodyDataJSON = JSON.stringify(bodyData);
    console.log(bodyDataJSON);
    try {
      const URI = "http://10.0.2.2:3000/profiles/615a3f8470e6e721d8ee26d4";
      const response = await fetch(
        URI,
        {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: bodyDataJSON,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <View>
      <Text>{name} {story}</Text>
      <TextInput 
        multiline
        numberOfLines = {5}
        value = {story}
        onChangeText = {setStory}
        placeholder = {route.params.story}
      />
      <Button
        title = "Submit"
        onPress = { 
          async() => {
            var response = await update();
            console.log(story);
            console.log(await response.json());
            navigation.navigate({
              name: 'MainProfile',
              params: { story: story },
              merge: true,
            });
          } 
        }
      />

    </View>
  )
}

export default Profile;