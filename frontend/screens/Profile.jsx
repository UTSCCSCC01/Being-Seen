/* eslint-disable react/jsx-no-bind */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import ScreenHeader from "../components/ScreenHeader";
import apiHandler from "../util/APIHandler";

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator initialRouteName={MainProfile}>
      <Stack.Screen
        name="MainProfile"
        options={{ headerShown: false }}
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
    <>
      <ScreenHeader
        headerText="My Profile"
        rightNode={<Icon name="pencil" style={styles.editIcon} />}
        rightContainerStyle={styles.editIconContainer}
        handleOnPressRightNode={() => {
          navigation.navigate("EditProfile", {
            name,
            story,
          });
        }}
      />
      <View style={styles.profileBlockContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={require("../assets/rickroll.jpg")}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.usernameText}>{name}</Text>
          <Text>Balance: {balance}</Text>
          <Text>Story: </Text>
          <Text>{story}</Text>
        </View>
      </View>
    </>
  );
}

function EditProfile({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [story, setStory] = useState(route.params.story);

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    fontSize: 30,
  },
  editIconContainer: {
    alignItems: "center",
    // backgroundColor: "#abc",
    flex: 1,
    height: 40,
    justifyContent: "center",
    marginLeft: -10,
    paddingRight: 10,
  },
  profileBlockContainer: {
    // backgroundColor: "#a73",
    flexDirection: "row",
  },
  profileInfoContainer: {
    // backgroundColor: "#c80",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 10,
  },
  profilePicture: {
    height: 100,
    resizeMode: "stretch",
    width: 100,
  },
  profilePictureContainer: {
    borderRadius: 50,
    height: 100,
    margin: 10,
    overflow: "hidden",
    width: 100,
  },
  usernameText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
});

export default Profile;
