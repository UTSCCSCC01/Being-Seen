/* eslint-disable react/jsx-no-bind */
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import Button from "../components/Button";
import QuotationBlock from "../components/QuotationBlock";
import ScreenHeader from "../components/ScreenHeader";
import apiHandler from "../util/APIHandler";

function EditProfile() {
  const navigation = useNavigation();
  const [story, setStory] = useState("loading");

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
          setStory(responseJSON.story);
        })
        .catch((error) => {
          console.error(error);
          alert(`Promise rejected: ${error}`);
        });
    });
  }, []);

  return (
    <>
      <ScreenHeader leftNode={<BackButton />} headerText="Edit Profile" />
      <View style={editStyles.textInputContainer}>
        <ScrollView>
          <TextInput
            multiline
            textAlignVertical="top"
            numberOfLines={5}
            value={story}
            onChangeText={setStory}
            placeholder={story}
            style={editStyles.textInput}
          />
        </ScrollView>
      </View>
      <View style={styles.submitButtonView}>
        <Button
          label="Submit"
          onClick={async () => {
            const id = await getProfileIdFromToken();
            try {
              const response = await apiHandler.updateStoryForProfile(
                story,
                id
              );
              if (response.status === 200) {
                navigation.goBack();
              } else {
                alert(`Http request failed: code ${response.status}`);
              }
            } catch (error) {
              alert(`Promise rejected: ${error}`);
            }
          }}
          disabled={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  balanceText: {
    fontSize: 18,
  },
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
  submitButtonView: {
    ...tailwind("mx-4 my-2"),
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
  usernameText: {
    fontSize: 32,
    // fontWeight: "bold",
  },
});

const editStyles = StyleSheet.create({
  textInput: {},
  textInputContainer: {
    ...tailwind("m-2 p-2 rounded-xl bg-light-grey"),
  },
});

export default EditProfile;
