import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import apiHandler from "../util/APIHandler";

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator initialRouteName={MainProfile}>
      <Stack.Screen
        name="MainProfile"
        options={{ headerShown: true, headerTintColor: "#662997" }}
        component={MainProfile}
        initialParams={{
          name: "",
          story: "",
          balance: "",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        options={{ headerShown: true, headerTintColor: "#662997" }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}

/**
 *
 * @function MainProfile Display profile tab
 * @module MainProfile Profile
 * @description full page of to display profile
 */
function MainProfile({ route, navigation }) {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [balance, setBalance] = useState(0);

  // TODO may need to implement initialParams
  useEffect(() => {
    apiHandler
      .getProfile("615a3f8470e6e721d8ee26d4")
      .then((response) => response.json()) // handles parsing
      .then((responseJSON) => {
        // handles setting
        setName(responseJSON.name);
        setStory(responseJSON.story);
        setBalance(responseJSON.balance);
      })
      .catch((error) => {
        console.error(error);
        alert(`Promise rejected: ${error}`);
      });
  }, [route.params.name, route.params.story, route.params.balance]);

  // TODO RETURN component
  return (
    <View>
      <Text>
        {name} {story} {balance}
      </Text>
      <Button
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("EditProfile", {
            name,
            story,
          });
        }}
      />
    </View>
  );
}

function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [story, setStory] = useState(route.params.story);

  return (
    <View>
      <Text>
        {name} {story}
      </Text>
      <TextInput
        multiline
        numberOfLines={5}
        value={story}
        onChangeText={setStory}
        placeholder={route.params.story}
      />
      <Button
        title="Submit"
        onPress={async () => {
          try {
            const response = await apiHandler.updateStoryForProfile(
              story,
              "615a3f8470e6e721d8ee26d4"
            );
            if (response.status === 200) {
              navigation.navigate({
                name: "MainProfile",
                params: { story },
                merge: true,
              });
            } else {
              alert(`Http request failed: code ${response.status}`);
            }
          } catch (error) {
            alert(`Promise rejected: ${error}`);
          }
        }}
      />
    </View>
  );
}

export default Profile;
