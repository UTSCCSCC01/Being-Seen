/* eslint-disable react/jsx-no-bind */
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { tailwind } from "tailwind";

import QuotationBlock from "../components/QuotationBlock";
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
        options={{ headerShown: true }}
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

  async function getProfileIdFromToken() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded.id;
  }

  // TODO may need to implement initialParams
  useEffect(() => {
    getProfileIdFromToken().then((id) => {
      apiHandler
        .getProfile(id)
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
    });
  }, [route.params.name, route.params.story, route.params.balance]);

  // TODO RETURN component
  return (
    <ScrollView>
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
          <Text style={styles.storyText}>{story}</Text>
        </View>
      </View>
      <View style={styles.horizontalRuler} />
      <Text style={styles.storySectionTitle}>About me</Text>
      <QuotationBlock
        text={story}
        fontSize={16}
        style={styles.quotationBlock}
      />
    </ScrollView>
  );
}
MainProfile.PropTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

function EditProfile({ route, navigation }) {
  const [story, setStory] = useState(route.params.story);

  async function getProfileIdFromToken() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded.id;
  }

  return (
    <>
      <View style={editStyles.textInputContainer}>
        <TextInput
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          value={story}
          onChangeText={setStory}
          placeholder={route.params.story}
          style={editStyles.textInput}
        />
      </View>
      <Button
        title="Submit"
        onPress={async () => {
          const id = await getProfileIdFromToken();
          try {
            const response = await apiHandler.updateStoryForProfile(story, id);
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
EditProfile.PropTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
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
  horizontalRuler: {
    ...tailwind("border-gray-400"),
    borderBottomWidth: 1,
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
  quotationBlock: {
    marginHorizontal: 22,
  },
  storySectionTitle: {
    fontSize: 28,
    marginLeft: 20,
    marginTop: 10,
  },
  storyText: {
    // backgroundColor: "#abc",
    fontSize: 12,
    padding: 4,
  },
  usernameText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
});

const editStyles = StyleSheet.create({
  textInput: {},
  textInputContainer: {
    padding: 10,
  },
});

export default Profile;
