/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import icons from "../constants/icons";
import Login from "./Login";

/**
 * @function LandingScreen
 * @module LandingScreen
 * @description The landing page (or "Home") of this App. It contains the newsreel.
 */
const LandingScreen = () => {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("0");
  return (
    <SafeAreaView style={styles.landingView}>
      <ScrollView>
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
    ...tailwind("px-4 py-2"),
    flex: 1,
  },
  profileText: {
    ...tailwind("text-base text-black font-medium"),
  },
  profileView: {
    ...tailwind(
      "bg-secondary flex-row my-2 px-3.5 py-2.5 rounded-xl justify-between items-center"
    ),
  },
  rightArrow: {
    ...tailwind("h-4 w-4"),
  },
});

export default LandingScreen;
