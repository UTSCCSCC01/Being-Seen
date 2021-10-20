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

/**
 *
 * @function Profile
 * @module Profile
 * @description full page of to display profile 
 */
function Profile(props) {
  const [profile, setProfile] = useState({
    name: "default name",
    story: "default story",
    balance: 0,
  });

  async function getProfile(id) {
    try {
      const URI = "http://10.0.2.2:3000/profile/";
      const response = await fetch(
        //ipv4 localhost since running emulator
        //10.0.2.2 is your machine's localhost when on an android emulator
        URI.concat(id),
        {
          method: "GET",
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProfile(props.id)
      .then((response) => response.json())
      .then((json) => setProfile(json))
      .catch((error) => console.error(error));
  }, []);

  // TODO RETURN component
  return (
	  <p>{profile.name} {profile.story}</p>
  )
}
