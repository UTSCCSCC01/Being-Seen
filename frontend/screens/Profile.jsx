import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { tailwind } from "tailwind";

import BackButton from "../components/BackButton";
import { SecondaryHeader } from "../components/Headers";
import ScreenHeader from "../components/ScreenHeader";
import Spinner from "../components/Spinner";
import icons from "../constants/icons";
import apiHandler from "../util/APIHandler";

/**
 * @function MainProfile
 * @module MainProfile
 * @description Full page of to display profile
 */
function MainProfile({ route, navigation }) {
  const isFocused = useIsFocused();

  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getProfileIdFromToken() {
    const token = await SecureStore.getItemAsync("token");
    const decoded = await jwt_decode(token);
    return decoded.id;
  }

  const refresh = () => {
    setLoading(true);
    getProfileIdFromToken()
      .then((id) => {
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
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    refresh();
  }, [isFocused]);

  useEffect(() => {
    refresh();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <View>
      <ScreenHeader
        leftNode={<BackButton />}
        headerText="My Profile"
        rightNode={<Image source={icons.settings} style={styles.tabIcon} />}
        handleOnPressRightNode={() => {
          navigation.push("Settings");
        }}
      />
      <ScrollView>
        <View style={styles.profileBlockContainer}>
          <View style={styles.profilePictureContainer}>
            <Image
              // eslint-disable-next-line global-require
              source={require("../assets/rickroll.jpg")}
              style={styles.profilePicture}
            />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.usernameText}>{name}</Text>
            <View style={styles.balanceView}>
              <Text style={styles.balanceHeader}>Balance</Text>
              <Text style={styles.balance}>${balance}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoView}>
          <View style={styles.infoHeaderView}>
            <SecondaryHeader text={`${name}'s Story`} />
          </View>
          <Text style={styles.storyText}>{story}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
MainProfile.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  balance: {
    ...tailwind("text-lg font-bold"),
  },
  balanceHeader: {
    ...tailwind("text-sm text-grey"),
  },
  balanceView: {
    ...tailwind(
      "flex-col justify-center items-center bg-light-grey rounded-lg my-2 px-3 py-1"
    ),
  },
  infoHeaderView: {
    ...tailwind("my-2"),
  },
  infoView: {
    ...tailwind("my-4 px-4"),
  },
  profileBlockContainer: {
    // backgroundColor: "#a73",
    flexDirection: "row",
  },
  profileInfoContainer: {
    ...tailwind("flex-col p-3"),
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
  storyText: {
    ...tailwind("text-base"),
  },
  submitButtonView: {
    ...tailwind("mx-4 my-2"),
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
  usernameText: {
    ...tailwind("text-2xl font-bold"),
  },
});

export default MainProfile;
