import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tailwind } from "tailwind";

import {
  PrimaryHeader,
  SecondaryHeader,
  TertiaryHeader,
} from "../components/Headers";
import Newsreel from "../components/screen_components/Newsreel";
import icons from "../constants/icons";
import apiHandler from "../util/APIHandler";
import Login from "./Login";

/**
 * @function LandingScreen
 * @module LandingScreen
 * @description The landing page (or "Home") of this App. It contains the newsreel.
 */
const LandingScreen = () => {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("0");

  const navigation = useNavigation();

  const numPosts = "10";

  return (
    <SafeAreaView style={styles.landingView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerView}>
          <PrimaryHeader text={`Welcome ${username}!`} />
        </View>
        <View style={styles.balanceView}>
          <View style={styles.balanceTextView}>
            <Text style={styles.balanceHeader}>Balance</Text>
            <Text style={styles.balance}>{`$${balance}`}</Text>
          </View>
        </View>
        <Pressable style={styles.profileView} onPress={() => {}}>
          <Text style={styles.profileText}>View profile</Text>
          <Image source={icons.right_arrow} style={styles.rightArrow} />
        </Pressable>
        <SecondaryHeader text="Recent Posts" />
        <Newsreel
          navigation={navigation}
          numPosts={numPosts}
          infoGetter={() => {
            return apiHandler.getMostRecentNewsFromApi(numPosts);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  balance: {
    ...tailwind("text-2xl text-black font-bold"),
  },
  balanceHeader: {
    ...tailwind("text-base text-black font-bold"),
  },
  balanceTextView: {
    ...tailwind("flex-col"),
  },
  balanceView: {
    ...tailwind("bg-secondary flex-row my-2 p-3.5 rounded-xl"),
  },
  headerView: {
    ...tailwind("my-2"),
  },
  landingView: {
    flex: 1,
  },
  profileText: {
    ...tailwind("text-base text-black font-medium"),
  },
  profileView: {
    ...tailwind(
      "bg-secondary flex-row mt-2 mb-4 px-3.5 py-2.5 rounded-xl justify-between items-center"
    ),
  },
  rightArrow: {
    ...tailwind("h-4 w-4"),
  },
  scrollView: {
    ...tailwind("px-4 py-2"),
  },
});

export default LandingScreen;
